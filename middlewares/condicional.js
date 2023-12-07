const condicional = (req, res, next) => {
    console.log('entrando a prueba'); //esto se muestra en consola cada vez que se ejecuta el middleware

    if(Math.random() > 0.5) {                //si el if se cumple se envia el 'tuviste suerte' a la vista y no el 'hola' que hay en el controlador ni entra al controlador
        res.send('<h1>Tuviste suerte!</h1>') //si no se cumple si se ejecuta el controller y se manda el 'hola' a la vista
        return;                              // esto sirve para elegir q vamos a mostrar al usuario segun alguna condicion
      
        //el return es importante para cortar la ejecucion del middleware y que no llegue al controlador
        //si con la condicion yo quiero q el usuario tenga permisos para llegar a lo q devuelva el controller, y no coloco el return el usuario terminara llegando de todas formas
    };
    next();
}

module.exports = condicional; //si lo exporto como objeto me saldra error cuando los ponga en los parametros de la ruta porq se espera una funcion 