const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js')

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

module.exports = router;