const {Router} = require('express')
const {userGet, userPut, userPost, userDelete} = require("../controllers/userController");
const {check} = require("express-validator");
const {validateCamps} = require("../middlewares/validate-camps");
const {isValidRole, existEmail, existUserById} = require("../helpers/db-validators");


const router = Router();

router.get('/', userGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateCamps
] ,userPut);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail().custom(existEmail),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6}),
    check('rol').custom(isValidRole),
    validateCamps

], userPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateCamps
] ,userDelete);

module.exports = router;
