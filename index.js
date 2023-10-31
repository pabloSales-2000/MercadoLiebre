const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')
const PORT = process.env.PORT || 8080;
const rutasProductos = require('./src/routers')

app.listen(PORT, () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT} y http://localhost:8080/`);
})

app.use(express.static(publicPath));

app.use('/productos', rutasProductos);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/home.html"));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./src/views/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./src/views/login.html"))
})

app.get('/productos/:id', (req, res) => {
    res.send(req.params.id)
})