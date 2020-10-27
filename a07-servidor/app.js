// Importamos los elementos de las bibliotecas que vamos a emplear
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// Carpeta de archivos estáticos.
app.use(express.static(__dirname));
// Para poder recibir datos en el body (Post) en formato json.
app.use(bodyParser.json());

var bbdd = {
    "personas": [
        { "dni": 22, "nombre": "Daniel", "apellidos": "Valiente", "saldo": 834.777 },
        { "dni": 32, "nombre": "Sergio", "apellidos": "Valiente", "saldo": 245.888 },
        { "dni": 54, "nombre": "Laura", "apellidos": "Villanueva", "saldo": 265.333 },
        { "dni": 85, "nombre": "Alicia", "apellidos": "Gonzalez", "saldo": 338.777 },
        { "dni": 91, "nombre": "Martin", "apellidos": "Gonzalez", "saldo": 523.888 },
        { "dni": 100, "nombre": "Marta", "apellidos": "Gomez", "saldo": 348.777 },
        { "dni": 121, "nombre": "Manuel", "apellidos": "Diaz", "saldo": 234.333 },
        { "dni": 134, "nombre": "Raquel", "apellidos": "Gomez", "saldo": 264.888 },
        { "dni": 154, "nombre": "Luis", "apellidos": "Garcia", "saldo": 744.777 },
        { "dni": 155, "nombre": "Diego", "apellidos": "Garcia", "saldo": 384.888 },
        { "dni": 163, "nombre": "Ana", "apellidos": "Garcia", "saldo": 246.777 },
        { "dni": 171, "nombre": "Eloisa", "apellidos": "Jimenez", "saldo": 234.888 },
        { "dni": 183, "nombre": "Pablo", "apellidos": "Lopez", "saldo": 425.333 },
        { "dni": 190, "nombre": "Gonzalo", "apellidos": "Lopez", "saldo": 564.333 },
        { "dni": 193, "nombre": "Antonio", "apellidos": "Martinez", "saldo": 664.333 },
        { "dni": 194, "nombre": "Pablo", "apellidos": "Martin", "saldo": 864.333 }
    ]
};

setHeaders = (res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

// ################# LISTADO DE PERSONAS ########################
app.get("/personas", function (req, res) {
    // req -> información de la petición recibida
    // res -> información de la respuesta que vamos a enviar.
    setHeaders(res);
    res.send(bbdd.personas);
});

// ################# INSERTAR ########################
app.post("/personas", function (req, res) {
    // body: objeto json con los datos recibidos, siempre que 
    // el Content-Type=application/json.
    var nuevo = req.body;
    console.log("Insertando: ", nuevo);
    nuevo && bbdd.personas.push(nuevo);
    setHeaders(res);
    res.send(nuevo);
});
// ################# BORRAR ########################
app.delete("/personas/:dni", function (req, res) {
    var dni = req.params.dni;
    var borrados = bbdd.personas.filter(p => p.dni == dni);
    bbdd.personas = bbdd.personas.filter(p => p.dni != dni);
            //filter(function(p){ return p.dni != dni;})
    console.log("Borrando: ", dni);
    setHeaders(res);
    res.send(borrados[0]);
});

// ################# INICIO DEL SERVIDOR ########################
app.listen(3020, function () {
    console.log("Aplicación escuchando en el puerto 3020");
});
