const mongoose= require (`mongoose`)
const {appConfig}=require(`../config`)

const productSchema= new mongoose.Schema({
    
    codigo:{
        type: Number,
        required: true
    },

    prenda:{
        type: String,
        required: true
        
    },

    marca:{
        type: String,
        required: true
        
    },


    categoria:{
        type: String,
        Enumerator:[pantalon,remera,vestido,pollera,short,anteojos,top],
        required: false
        
    },

    fechaIngreso:{
        type:Date,
        required: true
        
    },

    precioVenta:{
        type: Number,
        required: true
        
    },



    estado:{
        type: String,
        Enumerator:[vendido,local],
        required: false
        
    },

    tiempoEnVenta:{
        type: Number,
        required: false
        
    },


      createdAt:{
        type: Date,
        default: Date.now
        
    },

})


const Product=mongoose.model(`Product`,productSchema)
module.exports = Product;