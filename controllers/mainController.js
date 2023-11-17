const fs = require('fs') //requiero el paquete file system

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
        //GUARDAR USUARIOS

        //1ERO: Leer las cosas q ya habia. Porque si ya tenia usuarios registrados no quiero perder esa info

        let archivoUsuarios = fs.readFileSync('usuarios.json', {encoding: 'utf-8'}) //este metodo lee un archivo, explicado en 'prueba.js'
        let usuarios;  //PREGUNTA: EN QUE MOMENTO SE LE ACLARA A JAVASCRIPT QUE ESTO ES UN ARRAY?

        if(archivoUsuarios == ""){                      //primero leo el archivo, pero puede que el contenido este vacio
            usuarios = []                               // si es vacio, mi lista de usuarios todavia no tiene nada
        }else{                                          //por el contrario si el archivo ya tenia contenido
            usuarios = JSON.parse(archivoUsuarios)  //lo que haremos es descomprimir el archivo json para obtener el array de usuarios dentro de la variable usuarios
        }  

        usuarios.push(user) //en este punto usuarios o esta vacio o contiene el json descomprimido en formato js, con el metodo push de arrays agrego el user nuevo

        usuariosJSON = JSON.stringify(usuarios)  //ahora en la variable usuariosJSON guardo el array 'usuarios' con los usuarios convirtiendolo a json
        fs.writeFileSync('usuarios.json', usuariosJSON) //Y ahora con el metodo de fs reescribo el archivo usuarios.json con los nuevos usuarios logiados



        //GUARDARLA ->El codigo comentado mas sus comentarios a continuacion fue de prueba y la primera forma de aplicar esto, arriba como se debe hacer correctamente

        // no se puede guardar un obj lit en un archivo de texto, por eso guardamos la informacion en otra variable con formato JSON

        // let userJSON = JSON.stringify(user)         //CODIGO
        // fs.writeFileSync('usuarios.json', userJSON) //CODIGO

        //la variable userJSON guardara el objeto user de arriba pero en formato JSON para tener esa informacion compactada en un string
        //utilizo el metodo de fs para crear un archivo 'usuarios.json' q contendra a userJSON
        //cuando en el login el usuario complete los campos de nombre y contrase;a estos datos se guardaran en la variable user q es un objeto, de ahi se convertira en un json q almacenara la variable userJSON 
        //como este metodo reescribe el archivo cada vez q se utiliza sobre el mismo, cada vez q se guarde un login se reescribiran los datos

        res.redirect("/")  // esto hara que cuando el usuario envie o confirme el formulario lo redireccionara a la ruta q pongamos, en este caso HOME
    }

}

module.exports = mainController
