const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')
const PORT = process.env.PORT || 8080;
const methodOverride = require('method-override'); //Este paquete es para poder usar los metodos PUT Y DELETE ya que originalmente no son soportados por los formularios html(q solo pueden recibir get o post) ni todos los navegadores y para asegurar la compatibilidad es este paso adicional
const rutasProductos = require('./routers/productos.js');
const rutasMain = require('./routers/main.js');

app.listen(PORT, () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT} y http://localhost:8080/`);
})

app.set('view engine', 'ejs');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended:false})); // para poder trabajar con los datos de un formulario es necesario config el entorno de nuestra app para q sea capaz de capturar esa informacion
app.use(express.json());                       // Le estamos aclarando a la app q todo lo que llegue de un form queremos capturarlo en forma de objeto literal y tmb convertir esa inf en un JSON en caso de necesitarlo
app.use(methodOverride('_method'))
app.use('/', rutasMain);
app.use('/productos', rutasProductos);
app.use((req, res, next)=>{
    res.status(404).render('not-found')
})

