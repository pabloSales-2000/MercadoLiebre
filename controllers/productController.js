const productController = {

    productList: (req, res) => {
        let productos = ['Iphone XR', 'HP Ryzen 5', 'Iphone 13 pro max', 'Samsung a34'];
        return res.render('productos', {productos: productos})
    },

    idProducto: (req, res) => {
        res.send(`Bienvenidos al producto ${req.params.idProducto}`)
    },

    comentarios: (req, res) => {
        if (req.params.idComentario == undefined) {
            res.send(`Bienvenido a los comentarios del producto ${req.params.idProducto}`)
        } else {
            res.send(`Bienvenido a los comentarios del producto ${req.params.idProducto} y estas enfocado en el comentario ${req.params.idComentario}`)
        }
    }

}

module.exports = productController