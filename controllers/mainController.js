const { validationResult } = require('express-validator')
const fs = require('fs') //requiero el paquete file system
const bcrypt = require('bcryptjs'); //paquete npm para utilizar el metodo de comparar contrase;as q utilizo en la linea 57 (si modifico el codigo esta linea puede cambiar)

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
        //GUARDARLA ->El codigo comentado mas sus comentarios a continuacion fue de prueba y la primera forma de aplicar esto, abajo esta como se debe hacer correctamente

        // no se puede guardar un obj lit en un archivo de texto, por eso guardamos la informacion en otra variable con formato JSON

        // let userJSON = JSON.stringify(user)         //CODIGO
        // fs.writeFileSync('usuarios.json', userJSON) //CODIGO

        //la variable userJSON guardara el objeto user de arriba pero en formato JSON para tener esa informacion compactada en un string
        //utilizo el metodo de fs para crear un archivo 'usuarios.json' q contendra a userJSON
        //cuando en el login el usuario complete los campos de nombre y contrase;a estos datos se guardaran en la variable user q es un objeto, de ahi se convertira en un json q almacenara la variable userJSON 
        //como este metodo reescribe el archivo cada vez q se utiliza sobre el mismo, cada vez q se guarde un login se reescribiran los datos


        let errores = validationResult(req)
        let usuarioALoguearse;

        if (errores.isEmpty()) {
            let user = {
                username: req.body.nombreDeUsuario, // En este objeto se guardaran los datos q llene el usuario en el form, cuando la inf viaja por post
                contraseña: req.body.contraseña     // usamos req.body (y luego el nombre del campo como esta en el atributo name del input en el html) para acceder a ella, no como en GET que era req.query.
            }
            //GUARDAR USUARIOS

            //1ERO: Leer las cosas q ya habia. Porque si ya tenia usuarios registrados no quiero perder esa info

            let archivoUsuarios = fs.readFileSync('usuarios.json', { encoding: 'utf-8' }) //este metodo lee un archivo, explicado en 'prueba.js'
            let usuarios; 

            if (archivoUsuarios == "") {                      //primero leo el archivo, pero puede que el contenido este vacio
                usuarios = []                               // si es vacio, mi lista de usuarios todavia no tiene nada
            } else {                                          //por el contrario si el archivo ya tenia contenido
                usuarios = JSON.parse(archivoUsuarios)  //lo que haremos es descomprimir el archivo json para obtener el array de usuarios dentro de la variable usuarios
            }

            //verificar si esta logeado o no

            for (let i = 0; i < usuarios.length; i++) {                                      //un for que recorre todos los usuarios q quedan guardados en el login
                if (usuarios[i].username == req.body.nombreDeUsuario) {     
                    console.log("primer if");                 //la var user contiene en la prop username el req.body.nombreDeUsuario, entonces comparo del usuario en el item 'i' la prop username con lo q envia en el form el usuario 
                    if (bcrypt.compareSync(req.body.contraseña, usuarios[i].contraseña)) {
                        console.log('segundo if');   //si el primer if da true ahora estoy preguntando si las contrase;as son iguales, la q ingreso el usuario y la q esta registrada en mi BD 'usuarios.json'
                        usuarioALoguearse = usuarios[i]                                  //si el username coincide y la contrase;a tmb, el usuario a loguearse lo pongo el una variable con ese nombre
                        break; //ya encontre el usuario y no quiero seguir recorriendo el array, pongo break
                    }
                }
            }
            //luego pregunto si el usuario a loguearse sigue siendo indefinido, ya q no lo encontre en el for, y si es asi renderizo de nuevo la vista con errores q voy a definir manualmente
            if (usuarioALoguearse == undefined) {

                res.render('login', { errores: [{ msg: "Credenciales invalidas" }] }) //a la vista todo lo q se mande va en locals. en este caso locals.errores, como ya no estoy validando y estoy haciendolo manualmente
                                                                                       //defino un array, como antes mandaba errores.array(), y dentro el objeto con prop msg como el nombre de la propiedad q tienen los errores para mostrar un mensaje 
                                                                                       //y asi esta definido en la vista tmb (errores.msg), y pongo el mensaje a mostrar
                                                                                       //basicamente replico los errores de express-validator pero manualmente
            }else{
                req.session.usuarioLogueado = usuarioALoguearse;                       // guardo el usuario en session para tenerlo logueado a lo largo de toda la navegacion
                res.redirect('/')
            }
            


            //usuarios.push(user) //en este punto usuarios o esta vacio o contiene el json descomprimido en formato js, con el metodo push de arrays agrego el user nuevo

            //usuariosJSON = JSON.stringify(usuarios, null, 2)  //ahora en la variable usuariosJSON guardo el array 'usuarios' con los usuarios convirtiendolo a json
            //fs.writeFileSync('usuarios.json', usuariosJSON) //Y ahora con el metodo de fs reescribo el archivo usuarios.json con los nuevos usuarios logiados

        } else {
            res.render('login', { errores: errores.array(), old: req.body })
        }
    },

    validarA: (req, res) => {
        res.render('formExpVali')
    },

    validarB: (req, res) => {
        let errores = validationResult(req)
        if (errores.isEmpty()) {                          //isEmpty devuelve un booleano q verifica si errores esta vacio o no
            let usuario = {                               //si esta vacio, no hay errores, es true y se ejecuta el codigo con normalidad
                nombreCompleto: req.body.nombreCompleto,  //caso contrario se ejecuta el else
                email: req.body.email,
                password: req.body.password,
                categoria: req.body.categoria
            }

            let usuariosValidados = fs.readFileSync('usersValidation.json', { encoding: 'utf-8' })
            let usuariosNuevos;

            if (usuariosValidados == "") {
                usuariosNuevos = []
            } else {
                usuariosNuevos = JSON.parse(usuariosValidados)
            }

            usuariosNuevos.push(usuario);

            fs.writeFileSync('usersValidation.json', JSON.stringify(usuariosNuevos, null, 2))

            res.redirect('/')

        } else {
            res.render('formExpVali', { errores: errores.array(), old: req.body }) //comparto la variable errores con la vista y el metodo .array() los va a convertir en un array y me permite enviarlos a la vista, sin este metodo puedo tener algunos problemas. Ademas utilizare forEach en la vista y es un metoo para recorrer arrays
        }                                                                          //tambien comparto en la var old lo que llega en el body para poder conservar los datos q si esten bien validados y solo se tenga q volver a completar los campos no validados

        //si hago res.send(errores) me devolvera en la vista un objeto con los errores q haya por campo y sus propiedades por ej msg : 'mensaje de error q definimos en la ruta' y otras prop

    },

    prueba: (req, res) => {
        console.log('estoy en el controller');
        res.send('hola')
    },

    pruebaSession: (req, res) => {                  //req.session.numeroVisitas es una var q se mantiene y puedo compartir en todas las paginas
        if (req.session.numeroVisitas == undefined) { //inicialmente sera undefined y el if dara true,
            req.session.numeroVisitas = 0           // entonces se incializara la variable en 0 y afuera del if se le suma uno
        }
        req.session.numeroVisitas++;               //luego por cada vez q acceda a la ruta esta var aumentara de 1 en 1

        res.send(`Esta pag tiene ${req.session.numeroVisitas} views`) //y este mensaje mando a la vista para ver el valor de req.session.numeroVisitas
    },

    numeroSession: (req, res) => {
        res.send(`Session tiene el numero: ${req.session.numeroVisitas}`) //este metodo del controller atiende otra ruta y la variable sigue teniendo el mismo valor, se comparte entre todas las paginas de mi web
    }
}

module.exports = mainController
//los metodos del controlador pueden ser varias const q contengan una funcion y exportar todo eso como un objeto
//asi module.exports = {funcion1, funcion2}