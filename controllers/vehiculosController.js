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

// exports.buscador = async(req,res,next) => {
    
//     try {
        
//         const {vehiculo, marca, ano, descripcion, vendido} = req.query;
        
//         console.log(typeof(ano));
//         const a = Number(ano);
//         console.log(typeof(a));

//         const vehiculos = await Vehiculo.find({});

//         vehiculos.forEach(car => {
//             // if(car.vehiculo === vehiculo || car.marca === marca || car.ano === ano || car.descripcion === descripcion || car.vendido === vendido){

//             // }
            
//             if(car.marca === marca || car.ano === a){
//                 // const resultado = [];
//                 // resultado = resultado.concat(car);
//                 // console.log(resultado);
//                 // const resultado = vehiculos.map(car);
//                 console.log('encontrado');
                
//             }
//         });

//         console.log(resultado);
//         res.json(resultado);
        
//     } catch (error) {
//         next(error);
//     }
// };

exports.buscarVehiculo = async(req, res, next) => {

    const marcaQuery = req.query.marca
    const anoQuery = req.query.ano

    try {

        const vehiculoEncontrado = await Vehiculo.find( marcaQuery && anoQuery ? {$and:[{marca: marcaQuery},{ano: anoQuery} ]} : {$or:[{marca: marcaQuery},{ano: anoQuery} ]})

        res.status(200).json(vehiculoEncontrado)


    } catch (error) {

        next(error)
    }
}

exports.mostrarVehiculoPorId = async(req,res,next) => {

    try {

        const {id} = req.params;
        const vehiculoEncontrado = await Vehiculo.findById(id);
        if(vehiculoEncontrado){
            return res.json(vehiculoEncontrado);
        }else{
            res.status(404).end();
        }
        
    } catch (error) {
        next(error);
    }
    
};

exports.modificarDatos = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        const {vehiculo, marca, ano, descripcion, vendido, updated} = req.body;

        const newVehiculo = {
            vehiculo,
            marca,
            ano,
            descripcion,
            vendido,
            updated: new Date()
        };

        const vehiculoUpdated = await Vehiculo.findByIdAndUpdate(id,newVehiculo,{new: true});
        res.json(vehiculoUpdated);

    } catch (error) {
        
        next(error);
    }

};

exports.cambiarEstadoVendido = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        const {vendido: sold} = await Vehiculo.findById(id);

        // cambiar el estado
        let estado = false;
        if(sold === estado) {
            
            estado = true;
        }else{
            estado = false;
        }
 
        const newVehiculo = {

            vendido: estado,
            updated: new Date()
        };

        const vehiculoUpdated = await Vehiculo.findByIdAndUpdate(id,newVehiculo,{new: true});
        res.json(vehiculoUpdated);
    } catch (error) {
        
        next(error);
    }
    
};

exports.borrarVehiculo = async(req,res,next) => {

    try {
        
        const {id} = req.params;
        await Vehiculo.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        
        next(error);
    }

};




