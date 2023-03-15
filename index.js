const express=require(`express`)
const bcryptjs= require	(`bcryptjs`)
const cors= require(`cors`)
const dotenv=require(`dotenv`)
const jwt=require(`jsonwebtoken`);
const {appConfig,dbConfig}=require(`./config`);
const connectDb =require(`./db/mongodb`)
const app=require(`./app`)


dotenv.config() 
app.use(cors())
app.use(express.json())
// app.use(`/public`,express.static(`${__dirname}/storage/images`))//definir la ruta publica para acceder a las imagenes


const initApp=async(appConfig,dbConfig)=>{  //inicamos la base de datos

    try {
        await connectDb(dbConfig);
        app.listen(appConfig.port,()=>{
            console.log(`servidor corriendo en puerto ${appConfig.port}`)
        })
    } catch (error) {
        console.log(error);
        process.exit(0) //terminar el proceso que se viene haciendo
        
    }

}

initApp(appConfig, dbConfig); //llamo a l afuncion para que funcione y de esta manera ya tenemos todo configurado. lo que hice fue primero definir las variables generales, despues en config.js configuarar lso puertos del back y la base de datos y despues en mongodb.js conectar hacer la funcion que conecta a la base de datos (con los datos de configDb( de config.js)) para usarla en initApp
