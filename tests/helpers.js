const supertest = require('supertest');
const {app} = require('../index');
// const Vehiculo = require('../models/Vehiculo');

const api = supertest(app);

const initialVehicles = [
    {
        "vehiculo" : "Integra GS 1.8",
        "marca" : "Acura",
        "ano" : 1996,
        "descripcion" : "vehiculo grande",
        "vendido" : false
    },
    {
        "vehiculo": "Legend 3.2/3.5",
        "marca": "Acura",
        "ano": 1997,
        "descripcion": "vehiculo grande",
        "vendido": false
    },
    {
        "vehiculo": "NSX 3.0",
        "marca": "Acura",
        "ano": 2000,
        "descripcion": "vehiculo grande",
        "vendido": false
    }
]

// const getUsers = async () => {
//     const usersDB = await User.find({});
//     return usersDB.map(user => user.toJSON());
// }

module.exports = {
    initialVehicles,
    api
}