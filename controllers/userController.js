const {response} = require('express');

const userGet = (req, res = response) => {
    const {name = 'No name', age = 0 } = req.query;
    res.json({
        msg: "get API - controlador",
        name,
        age: Number(age)
    })
}
const userPut = (req, res = response) => {

    const id = Number(req.params.id);

    res.json({
        msg: "put API - controlador",
        id
    })
}
const userPost = (req, res = response) => {
    const {name, age} = req.body;

    res.json({
        msg: "post API - controlador",
        name, age
    })
}
const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controlador"
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
