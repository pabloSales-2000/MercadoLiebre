const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')
const PORT = process.env.PORT || 8080;
const rutasProductos = require('./routers')

app.listen(PORT, () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT} y http://localhost:8080/`);
})

app.use(express.static(publicPath));

//app.use('/productos', rutasProductos);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
})

app.get('/productos/:idProducto', (req, res) => {
    res.send(`Bienvenidos al producto ${req.params.idProducto}`)
})