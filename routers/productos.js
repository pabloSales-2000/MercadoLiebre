const express = require('express');
const router = express.Router();

router.get('/:idProducto', (req, res) => {
    res.send(`Bienvenidos al producto ${req.params.idProducto}`)
})

router.get('/:idProducto/comentarios/:idComentario?', (req, res) => {
    if (req.params.idComentario == undefined) {
        res.send(`Bienvenido a los comentarios del producto ${req.params.idProducto}`)
    } else {
        res.send(`Bienvenido a los comentarios del producto ${req.params.idProducto} y estas enfocado en el comentario ${req.params.idComentario}`)
    }
})

module.exports = router;