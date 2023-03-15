const mongoose = require(`mongoose`)
const {dbConfig} = require(`../config`)
mongoose.set(`strictQuery`,true); //para que no se puedan hacer consultas con campos que no existen en el modelo.
//configuracion base de datos

mongoose.connection.on(`open`,()=> console.log( 'conexion a la base de datos establecida'))

const connectDb= async()=>{
    const {host,portName,dbName }=dbConfig;
    const uri=`mongodb://${host}:${portName}/${dbName}`

    await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true }) //mongo db te pide esto pero diego dice que no sabe porque
}

module.exports=connectDb // exportamos asi la configuarcion de la base de datos!