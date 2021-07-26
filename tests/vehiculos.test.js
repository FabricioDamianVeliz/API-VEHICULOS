const mongoose = require('mongoose');
const {server} = require('../index');
const Vehiculo = require('../models/Vehiculo');
const {initialVehicles,api} = require('./helpers');

beforeEach(async () => {
    await Vehiculo.deleteMany({});

    //secuencial
    for(const vehicle of initialVehicles){
        const vehicleObject = new Vehiculo(vehicle);
        await vehicleObject.save();
    }
})

describe('GET all vehicles', () => {
    test('los vehiculos se devuelven en json', async () => {
        await api
            .get('/vehiculos')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    
    test('tenemos 3 vehiculos', async () => {
        
        const response = await api.get('/vehiculos');
        expect(response.body).toHaveLength(initialVehicles.length);
            
    });
    
    test('la marca de alguno de los vehiculos es correcta', async () => {
        
        const response = await api.get('/vehiculos');
        const marcas = response.body.map(vehiculo => vehiculo.marca);
        expect(marcas).toContain('Acura');
            
    });
});

describe('create a vehicle', () => {
    test('se puede agregar un vehiculo válido', async () => {
    
        const newVehicle = {
            vehiculo: "Virage Coupe 6.0 V12 490cv",
            marca: "ASTON MARTIN",
            ano: 2015,
            descripcion: "vehiculo grande",
            vendido: false
        }
    
        await api
            .post('/vehiculos')
            .send(newVehicle)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const response = await api.get('/vehiculos');
        const marcas = response.body.map(vehiculo => vehiculo.marca);
        expect(response.body).toHaveLength(initialVehicles.length+1);
        expect(marcas).toContain('ASTON MARTIN');
        
    });
    
    test('no se puede agregar un vehiculo válido', async () => {
        
        const newVehicle = {

            marca: "ASTON MARTIN",
            ano: 2015,
            descripcion: "vehiculo grande",
            vendido: false
        }
    
        await api
            .post('/vehiculos')
            .send(newVehicle)
            .expect(400)
        
        const response = await api.get('/vehiculos');
        expect(response.body).toHaveLength(initialVehicles.length);
    
    });
});

// test('una nota se puede borrar', async () => {
    
//     const response = await api.get('/api/notes');
//     const{body: notes} = response;
//     const noteToDelete = notes[0];

//     await api
//         .delete(`/api/notes/${noteToDelete.id}`)
//         .expect(204)

//     const responseTwo = await api.get('/api/notes');
//     expect(responseTwo.body).toHaveLength(initialNotes.length-1);

//     const contents = responseTwo.body.map(note => note.content);
//     expect(contents).not.toContain(noteToDelete.content);
// });

// test('una nota no se puede borrar', async () => {

//     await api
//         .delete('/api/notes/1234')
//         .expect(400)

//     const response = await api.get('/api/notes');

//     expect(response.body).toHaveLength(initialNotes.length);

// });

afterAll(() => {
    mongoose.connection.close();
    server.close();
})