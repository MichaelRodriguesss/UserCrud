const moment = require('moment');
const UserRepository = require('../repositories/UserRepository')

exports.generateTempPasswordExpirationDate = async (userId) => {
    const expirationDate = moment().add(1, 'hours');

    UserRepository.updateTempPasswordExpiration(userId, expirationDate)
}

exports.checkIfPasswordHasExpired = async (userId, expirationDate) => {
    const currentTime = moment().valueOf();

    if(currentTime > expirationDate) {
        await UserRepository.updateForgotPassword(userId, false);
        throw new Error('Senha Expirada')
    } else {
        
        return false;
    }
}