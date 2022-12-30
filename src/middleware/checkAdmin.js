const jwt = require("jsonwebtoken");
const UserRepository = require('../repositories/UserRepository');

async function checkAdmin (req, res, next) {
    try {
        var [authType, token] = req.headers.authorization.split(' ');
        if (!token) return res.status(401).json({ message: 'Token Inválido' });

        const decoded = jwt.verify(token, process.env.SECRET);
        
        const checkActive = await UserRepository.checkActive(decoded.id);
        if (!checkActive) return res.status(400).json({ message: 'Esse usuário está desativado' });

        let userPermission = await UserRepository.checkPermission(decoded.id);
        if (userPermission === 'admin') {

            req.user = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: 'Essa funcionalidade é restrita para administradores'
            });
        }
    } catch (e) {
        res.status(401).json({ message: 'Token Inválido' });
    }
};

module.exports = checkAdmin;