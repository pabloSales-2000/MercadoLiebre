const fs = require('fs');

function logDBMiddleware(req, res, next) {
    fs.writeFileSync('logDB.txt', `se registro el usuario ${JSON.stringify(req.body)}`) 
    next();
}

module.exports = logDBMiddleware