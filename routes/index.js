const express = require('express');
const router = express.Router();

//importar express validator
//const {body} = require('express-validator/check'); 
// const {body} = require('express-validator');

//importar el controlador
const vehiculosController = require('../controllers/vehiculosController');

module.exports = function(){

    //ruta para el home
    router.get('/',(req,res) => {
        res.send('<h1>Hola Mundo</h1>');
    });

    router.get('/vehiculos',vehiculosController.mostrarVehiculos);
    router.post('/vehiculos',vehiculosController.crearVehiculo);

    router.get('/vehiculos/find',vehiculosController.a);

    router.get('/vehiculos/:id',vehiculosController.a);
    router.put('/vehiculos/:id',vehiculosController.a);
    router.patch('/vehiculos/:id',vehiculosController.a);
    router.delete('/vehiculos/:id',vehiculosController.a);

    return router;
}