const { ObjectId } = require('mongodb');
const User = require('../model/User');


exports.find = async (data) => {
    const user = await User.find();

    if (!user) {
        throw new Error("Usuário não encontrado");
    } else {
        return user
    }
}

exports.findById = async (id) => {
    try {
        const user = await User.findById(ObjectId(id));

        if (!user) {
            throw new Error("Usuário não encontrado");
        } else {
            return user
        }
    } catch (e) {
        throw new Error("Usuário não encontrado");
    }
}

exports.checkActive = async (id) => {
    try {
        const user = await User.findById(ObjectId(id));

        return user.active ? true : false;
    } catch (e) {
        throw new Error("Usuário não encontrado");
    }
}

exports.checkPermission = async (id) => {
    try {
        const user = await User.findById(ObjectId(id));

        return user.permission
    } catch (e) {
        throw new Error("Usuário não encontrado");
    }
}

exports.update = async (id, data) => {
    return await User.findByIdAndUpdate({ _id: ObjectId(id) }, {
        username: data.username,
        email: data.email,
        permission: data.permission
    });

}

exports.updateActive = async (id, active) => {
    return await User.findByIdAndUpdate({ _id: ObjectId(id) }, { active });
}

exports.updateFirstAccess = async (id) => {
    return await User.findOneAndUpdate({ _id: ObjectId(id) }, { first_access: false });
}

exports.delete = async (id) => {
    return await User.findOneAndDelete({ _id: ObjectId(id) });
}