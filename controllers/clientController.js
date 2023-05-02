const mongoose = require(`mongoose`);
const Product = require(`../models/productSchema`);
const _ = require("lodash");

const getAllClients = async (req, res) => {
   
  
    try {
      const totalProducts = await Product.find();
      
      const objetoCliente={}
     

      totalProducts.forEach(x=>{
        //Si el cliente no existe en nuevoObjeto entonces
  //la creamos e inicializamos el arreglo de productos.
  if(!objetoCliente.hasOwnProperty(x.cliente)){
    [objetoCliente[x.cliente]={
      proveedor:x.cliente,
      productos:[],
      dineroPagado:0
    }]
    
  } 

  //agregamos los datos de productos.
    objetoCliente[x.cliente].productos.push({
      cliente:x.cliente,
      prenda:x.prenda,
      codigo:x.codigo,
      precioVenta:x.precioVenta,
      estado:x.estado
    })
    
 
    //  console.log( objetoCliente[x.cliente].productos.filter((producto)=>{producto.estado="vendido"}))
    

  
  })
  const clientes=_.toArray(objetoCliente)

 
      res.status(200).send({
        clientes
      
      });
  
  
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Error al buscar productos",
        error: error.message,
      });
    }
  };
  
//   const getProduct = async (req, res) => {
//     const { _id } = req.params;
  
//     try {
  
//       const product = await Product.findById({ _id });
  
//       if (!product) {
//         res.status(404).json({
//           statusCode: 404,
//           message: "Producto no encontrado",
//         });
//       } else {
//         res.status(200).json({
//           product,
//           statusCode: 200,
//           message: "Producto encontrado",
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         statusCode: 500,
//         message: "Error al buscar producto",
//         error: error.message,
//       });
//     }
//   };

module.exports = {
    getAllClients,
}