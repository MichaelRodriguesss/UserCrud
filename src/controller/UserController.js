const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const ValidationContract = require('../services/validatorService');
const mailService = require('../services/mailService');
const passwordService = require('../services/passwordService');
const crypto = require('crypto');

module.exports = {

  async register(req, res) {
    const { username, email, password, confirmpassword, permission} = req.body;

    let contract = new ValidationContract();
    contract.isRequired(username, 'O campo nome não pode ser vazio');
    contract.isEmail(email, 'E-mail inválido');
    contract.isSamePassword(password, confirmpassword, 'As senhas não combinam');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "Por favor tente usar outro E-mail!" });
    }

    // create password
    const passwordHash = await bcrypt.hash(password.toString(), 12);

    // create user
    const user = new User({
      username,
      email,
      password: passwordHash,
      permission
    });

    try {
      await user.save();
      res.status(201).json({ message: "Usuario criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(email, 'O campo nome não pode ser vazio');
    contract.isEmail(email, 'E-mail inválido');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    if(user.forgot_password == true) {

      const checkPassword = await bcrypt.compare(password.toString(), user.temp_password);
      console.log(!checkPassword);

      if (!checkPassword) {
        return res.status(422).json({ message: "senha incorreta!" });
      }
      
      if (user.active == false) throw new Error("Esse usuário foi desativado");

      // Caso a senha que o usuário mande for a senha temporária, o sistema verifica se a senha já foi expirada. Se  a senha passado não for a temporária, libera o acesso normal para a plataforma.
      if(user) {
          await passwordService.checkIfPasswordHasExpired(user.id, user.temp_password_expiration)
      } else {
          const checkPassword = await bcrypt.compare(password.toString() , user.password.toString());

          if (!checkPassword) {
          return res.status(422).json({ message: "senha incorreta!" });
         }

          await UserRepository.updateForgotPassword(user.id, false);
          await UserRepository.updateFirstAccess(user.id);

          user = await UserRepository.findByEmail(email);
      }
    } else {
      const checkPassword = await bcrypt.compare(password.toString() , user.password.toString());

      if (!checkPassword) {
      return res.status(422).json({ message: "senha incorreta!" });
     }
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id,
        },
        secret,
        {expiresIn: '1d'}
      );

      res.status(200).json({ message: "Autenticação bem sucedida!", token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async listAllUsers(req, res) {
    try {
      const users = await UserRepository.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async infoDetailUser(req, res) {
    const id = req.params.id;
  
    //check if user exists

    try {
      const user = await UserRepository.findById(id, "-password");
      res.status(200).json({ user });
    } catch(e) {
      return res.status(400).json({message: e.message});
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const dataCreate = {
      username, 
      email,
      password
    };

    try {
      const users = await UserRepository.update(id, dataCreate);

      if (!users) {
        return res.status(422).json({ message: "Usuário não encontrado!" });
      }

      res.status(200).json(dataCreate);
  } catch (error) {
    res.status(500).json({ error: error });
   }
  },

  async activateUser(req, res) {
    let { id } = req.params;

    try {
        let user = await UserRepository.findById(id);

        if (user.active === false) {
            await UserRepository.updateActive(id, true);
            res.status(200).json({ message: "Usuário ativado com sucesso" });
        } else {
            throw new Error("Usuário já está ativo");
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
  },

  async deleteUser(req, res) {
    let { id } = req.params;

    try {
        let user = await UserRepository.findById(id);

        if (user.first_access === true) {
            await UserRepository.delete(id);
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            await UserRepository.updateActive(id, false)
            res.status(200).json({ message: "Usuário desativado com sucesso" });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
  },

  async forgotPassword(req, res) {
    let { email } = req.body;

    let randomPassword = crypto.randomBytes(6).toString("HEX");
    let hashPassword = await bcrypt.hash(randomPassword, 12);

    let contract = new ValidationContract();
    contract.isRequired(req.body.email, 'O campo email não pode ser vazio');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        let user = await UserRepository.findByEmail(email);

        await UserRepository.updateForgotPassword(user.id, true);
        await UserRepository.updateTempPassword(user.id, hashPassword);

        await mailService.sendEmail({
            email: user.email,
            subject: "Recuperação de senha",
            payload: {
                username: user.username,
                password: randomPassword
            },
            template: "../template/newPassword.handlebars"
        });

        await passwordService.generateTempPasswordExpirationDate(user.id);

        res.status(200).json({ message: "E-mail enviado" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
  },

  async firstAccess(req, res) {
    
    const  id  = req.user;
    const {password, confirmPassword} = req.body;

    let user = await UserRepository.findById(id);

    let contract = new ValidationContract();
    contract.isRequired(password, 'O campo senha não pode ser vazio');
    contract.isRequired(confirmPassword, 'O campo confirmar senha não pode ser vazio');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        if (user.first_access == false && user.forgot_password == false) {
            throw new Error("Usuário já fez seu primeiro acesso")
        }

        if (password !== confirmPassword) {
            throw new Error("As senhas não podem ser diferentes")
        }

        const passwordHash = await bcrypt.hash(password.toString(), 12);
        await UserRepository.updatePassword(user.id, passwordHash);
        await UserRepository.updateFirstAccess(user.id);
        await UserRepository.updateForgotPassword(user.id, false);

        res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
  }
};