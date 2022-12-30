const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const ValidationContract = require('../services/validatorService');

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
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password.toString(), salt);

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

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    let contract = new ValidationContract();
    contract.isRequired(email, 'O campo nome não pode ser vazio');
    contract.isEmail(email, 'E-mail inválido');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    await UserRepository.updateFirstAccess(user.id);

    // check if the password match
    const checkPassword = await bcrypt.compare(password.toString(), user.password.toString());

    if (!checkPassword) {
      return res.status(422).json({ message: "senha incorreta!" });
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
    const user = await UserRepository.findById(id, "-password");
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
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
  }
};