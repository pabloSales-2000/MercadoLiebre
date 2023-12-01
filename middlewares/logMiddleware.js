const fs = require('fs');

function logMiddleware(req, res, next) {
    fs.writeFileSync('log.txt', `se ingreso a la pagina ${req.url}`) 
    next();
}

module.exports = logMiddleware

//Este middleware registra las url q se visitan en el sitio y guarda la inf en log.txt
//usando el metodo writeFileSync se esta reescribiendo el archivo constantemente y solo queda registro de la ultima url visitada
//si quisiera ir acumulando los registros utilizaria appendFileSync