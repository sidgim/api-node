const Role = require("../models/role");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const isValidRole = async (rol = '') => {
    const existRole = await Role.findOne({rol});
    if (!existRole) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const existEmail = async (email = '') => {
    const exist = await User.findOne({email});
    if (exist) {
         throw new Error(`El correo ${email} ya se encuentra registrado`);
    }
}
const existUserById = async (id) => {
    const exist = await User.findById(id);
    if (!exist) {
         throw new Error(`El id ${id} no existe`);
    }
}

const cryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

module.exports = {
    isValidRole,
    existEmail,
    cryptPassword,
    existUserById
}
