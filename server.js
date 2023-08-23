const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')
const PORT = 8080;

app.listen( PORT , () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT}`);
})

app.use( express.static(publicPath));

app.get( '/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})
