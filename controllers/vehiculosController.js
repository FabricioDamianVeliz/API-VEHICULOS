const Vehiculo = require('../models/Vehiculo');

exports.mostrarVehiculos = async(req,res) => {
    
    const vehiculos = await Vehiculo.find({});
    
    res.json(vehiculos);
        
};

exports.crearVehiculo = async(req,res,next) => {

    const {vehiculo, marca, ano, descripcion, vendido = false} = req.body;

    if(!vehiculo || !marca || !ano || !descripcion){
        return res.status(400).json({
            error: 'Falta un campo obligatorio'
        });
    }

    const newVehiculo = new Vehiculo({

        vehiculo,
        marca,
        ano,
        descripcion,
        vendido,
        created: new Date(),
        updated: null
        
    });

    try {
        
        const savedVehiculo = await newVehiculo.save();
        res.status(201).json(savedVehiculo);
    } catch (error) {
        next(error);
    }
    
};

exports.a = async() => {}

// vehiculosRouter.get('/vehiculos/find', async(req,res) => {
        
// });

// vehiculosRouter.get('/vehiculos/:id', (req,res,next) => {

//     // const id = Number(req.params.id);
//     const {id} = req.params;

//     Note.findById(id)
//         .then(note => {
//             if(note){
//                 return res.json(note);
//             }else{
//                 res.status(404).end();
//             }
//         })
//         .catch(error => next(error));
//         // console.log(err.message);
//         // res.status(400).end();
//         // const note = notes.find(note => note.id === id);
// });

// vehiculosRouter.put('/vehiculos/:id', (req,res,next) => {

//     const {id} = req.params;
//     const note = req.body;
//     const newNoteInfo = {
//         content: note.content,
//         important: note.important 
//     };

//     Note.findByIdAndUpdate(id,newNoteInfo,{new: true})
//         .then(result => {
//             res.json(result);
//         })
//         .catch(error => next(error));

// });

// vehiculosRouter.patch('/vehiculos/:id', (req,res,next) => {

//     const {id} = req.params;

//     // notes = notes.filter(note => note.id !== id);

//     Note.findByIdAndDelete(id)
//         .then(() => {
//             res.status(204).end();
//         })
//         .catch(error => next(error));

// });

// vehiculosRouter.delete('/vehiculos/:id', (req,res,next) => {

//     const {id} = req.params;

//     // notes = notes.filter(note => note.id !== id);

//     Note.findByIdAndDelete(id)
//         .then(() => {
//             res.status(204).end();
//         })
//         .catch(error => next(error));

// });


