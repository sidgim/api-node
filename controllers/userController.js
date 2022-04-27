const {response} = require('express');
const User = require('../models/user');
const {cryptPassword} = require("../helpers/db-validators");

const userGet = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query
    const query = {state: true};
    const [total, users] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
}
const userPut = async (req, res = response) => {

    const {id} = req.params;

    const {_id, password, google, email, ...r} = req.body;

    if (password) {
        r.password = cryptPassword(password)
    }

    const user = await User.findByIdAndUpdate(id, r);

    res.json(user)
}
const userPost = async (req, res = response) => {

    const {name, email, password, rol} = req.body;

    const user = new User({name, email, password, rol});

    user.password = cryptPassword(password)

    await user.save();

    res.json({
        msg: "post API - controlador",
        user
    })
}
const userDelete = async (req, res = response) => {
    const {id} = req.params;
    //const user = User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id, {state: false})
    await res.json({
        user
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
