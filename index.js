const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public') 
const PORT = process.env.PORT || 8080;
const methodOverride = require('method-override'); //Este paquete es para poder usar los metodos PUT Y DELETE ya que originalmente no son soportados por los formularios html(q solo pueden recibir get o post) ni todos los navegadores y para asegurar la compatibilidad es este paso adicional
const rutasProductos = require('./routers/productos.js');
const rutasMain = require('./routers/main.js');

//levantando el servidor
app.listen(PORT, () => {
    console.log(`[servidor]: corriendo en el puerto ${PORT} y http://localhost:8080/`);
})

// configuro cual sera mi motor de vistas (template engine)
app.set('view engine', 'ejs');

//establezco donde se almacenaran los archivos publicos
app.use(express.static(publicPath)); //publicPath es una variable q tiene la ruta de la carpeta public

app.use(express.urlencoded({extended:false})); // para poder trabajar con los datos de un formulario es necesario config el entorno de nuestra app para q sea capaz de capturar esa informacion
app.use(express.json());                       // Le estamos aclarando a la app q todo lo que llegue de un form queremos capturarlo en forma de objeto literal y tmb convertir esa inf en un JSON en caso de necesitarlo
 
//config para poder utilizar put y delete 
app.use(methodOverride('_method'))

//middleware para registro de rutas visitadas
const logMiddleware = require('./middlewares/logMiddleware.js')
app.use(logMiddleware)

//las rutas con prefijo '/' seran atendidas por la var rutasMain
app.use('/', rutasMain);

//las rutas con prefijo '/productos' seran atendidas por la var rutasProductos
app.use('/productos', rutasProductos);

//error cuando no se encontro un recurso en el servidor
app.use((req, res, next)=>{
    res.status(404).render('not-found')
})

