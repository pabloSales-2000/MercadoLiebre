const mainController = {

    home: (req, res) => {
        return res.render('home')
    },

    register: (req, res) => {
        return res.render('register')
    },

    login: (req, res) => {
        return res.render('login')
    },

    guardarLogin: (req, res) => {
        let user = {
            username : req.body.nombreDeUsuario, // En este objeto se guardaran los datos q llene el usuario en el form, cuando la inf viaja por post
            contraseña : req.body.contraseña     // usamos req.body (y luego el nombre del campo como esta en el atributo name del input en el html) para acceder a ella, no como en GET que era req.query.
        }

        //GUARDARLA (pendiente para ver mas adelante)

        res.redirect("/")  // esto hara que cuando el usuario envie o confirme el formulario lo redireccionara a la ruta q pongamos, en este caso HOME
    }

}

module.exports = mainController
