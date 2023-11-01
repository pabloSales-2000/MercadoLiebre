const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')
const PORT = process.env.PORT || 8080;
const rutasProductos = require('./routers/productos.js')
const rutasMain = require('./routers/main.js')

app.listen(PORT, () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT} y http://localhost:8080/`);
})

app.use(express.static(publicPath));

app.use('/productos', rutasProductos);

app.use('/', rutasMain);