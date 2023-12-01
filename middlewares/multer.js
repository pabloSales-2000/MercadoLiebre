const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/archivospruebas')
    },
    //LAS IMAGENES NO SE GUARDAN CON EL NOMBRE QUE ESTABLECI, REVISAR!!
    filename: (req, file, cb) => {
        const fileName =`img ${Date.now()} ${path.extname(file.originalname)}`  //esta variable tiene la fecha + la extension del archivo (file)
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;