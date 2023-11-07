const productController = {

    search: (req, res) => {
        let loQueBuscoElUsuario = req.query.search; //si quiero pedir inf de un formulario siempre empiezo con req.query y luego el campo del input q deseo, en este caso search
        //res.send(loQueBuscoElUsuario);

        let productosQuery = [
            { id: 1, nombre: 'Iphone 12 pro' },
            { id: 2, nombre: 'MacBook Pro 15' },
            { id: 3, nombre: 'Impresora HP' }
        ]

        let productosResultantes = [];

        for(let i=0; i < productosQuery.length; i++){ //recorro productosQuery
            if (productosQuery[i].nombre.includes(loQueBuscoElUsuario)){ // si el objeto dentro de prodQuery en su prop nombre incluye 'lo que busco el usuario' (la busqueda la hago con el metodo .includes)
                productosResultantes.push(productosQuery[i])             // se suma al array de 'productosResultantes'(lo agrego con el metodo .push de arrays)
            }
        }
        res.render('productResults', {productosResultantes: productosResultantes})

        console.log(req.query.search) // esto aparece en la consola y no en el navegador (prueba personal)
    },

    productList: (req, res) => {
        let productos = ['Iphone XR', 'HP Ryzen 5', 'Iphone 13 pro max', 'Samsung Galaxy A34'];
        let productosHipervinculo = [
            { id: 1, nombre: 'Iphone 12 pro' },
            { id: 2, nombre: 'MacBook Pro 15' },
            { id: 3, nombre: 'Impresora HP' }
        ]
        return res.render('productos', { productos: productos, productosHipervinculo: productosHipervinculo });
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