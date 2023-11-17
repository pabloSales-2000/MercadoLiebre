const fs = require('fs')

fs.writeFileSync('prueba.txt', 'hola soy una prueba') //Cree el archivo prueba.txt con el texto q pase como 2do parametro. para q se cree tuve q ejecutar en la terminal 'node prueba.js'

fs.writeFileSync('prueba.txt', 'Hola soy prueba 2') //este metodo de fs ademas de haber creado el archivo en la linea de arriba ahora reescribo lo que dice. Este metodo pisa el contenido anterior y lo borra reemplazandolo por el nuevo texto q puse como segundo parm. Para q tome efecto ejecuto en la terminal node prueba.js

fs.appendFileSync('prueba.txt', 'Agregando texto al final') // este metodo agrega el texto q le paso como 2do parametro al final del archivo que le pase como 1er parametro

let contenido = fs.readFileSync('prueba.txt') //metodo fs para leer un archivo
console.log(contenido); //esta variable muestra el contenido del archivo pero no se entiende

let contenidoLegible = fs.readFileSync('prueba.txt', {encoding: 'utf-8'}) // este segundo parametro permite que podamos mostrar lo q contiene el archivo en el lenguaje cotidiano y podamos entenderlo
console.log(contenidoLegible); //esta variable muestra el contenido de prueba.txt de manera q podamos entenderlo
