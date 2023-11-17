const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.productList)

router.get('/search', productController.search)

router.get('/edit/:idProducto', productController.edit) //esta ruta me tira el formulario para editar el nombre del producto

router.put('/edit', (req, res)=>{ //una vez configurado el action en el fomulario para q viaje por PUT poniendo su query correspondiente al enviar me devolvera a la ruta edit/ el query del PUT y con res.send envio lo q quiero ver en esa ruta
    res.send("Fui por PUT!!!")
})

router.delete('/delete/:idProducto', (req, res) =>{  // el :idProducto es el que pusimos en el query de la vista de productos en el action del formulario del butonn delete
    res.send("SOY DELETE!!!")
})

router.get('/detalle/:idProducto', productController.idProducto)

router.get('/:idProducto/comentarios/:idComentario?', productController.comentarios)

router.get('/usuarios/list', productController.userList)



module.exports = router;