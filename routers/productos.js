const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.productList)

router.get('/:idProducto', productController.idProducto)

router.get('/:idProducto/comentarios/:idComentario?', productController.comentarios)

module.exports = router;