const express = require('express');
const router = express.Router();
const { body } = require('express-validator') //utilizando destructuracion de objetos accedo solo a la prop body de la libreria de express validator
const mainController = require('../controllers/mainController.js')
const logDBMiddleware = require('../middlewares/logDBmiddleware.js')

//Validaciones
const validacionesFormEV = [   //aclaro en un array cuales seran las validaciones para el form, luego esta variable la utilizare como middleware en la ruta q atiende el formExpVali

    body('nombreCompleto').notEmpty().withMessage('Debes completar el campo de nombre'), //en body pongo el nombre del campo del input del form. notEmpty quiere decir q el campo no puede estar vacio y withMessege es para enviar un mensaje de error si el usuario no llena el campo
    body('email').isEmail().withMessage('Debe ingresar un e-mail valido'), //haremos una validacion por cada campo de input
    body('password').notEmpty().withMessage('Ingrese una contraseña')

];


router.get('/', mainController.home)
// (req, res) => {
// res.sendFile(path.resolve(__dirname, "./views/home.ejs"));
// }                                                           //estas lineas comentadas eran el segundo parametro para renderizar las vistas antes de hacerlo con un controlador y las dejo parar recordar como se hacia

router.get("/register", mainController.register)
//    (req, res) => {
//     res.sendFile(path.join(__dirname, "./views/register.ejs"))
//    }

router.get("/login", mainController.login)
// (req, res) => {
// res.sendFile(path.join(__dirname, "./views/login.ejs"))
//}

router.post("/login", logDBMiddleware, mainController.guardarLogin)


//esta ruta muestra el formulario q utilizare para practicar con express validator
router.get('/validar', mainController.validarA)

//ruta post que procesara los datos enviados del formulario
router.post('/validar', validacionesFormEV, mainController.validarB)



module.exports = router;  //al exportar router exporto todas las rutas definidas en este archivo?