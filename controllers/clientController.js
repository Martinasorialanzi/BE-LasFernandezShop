const mongoose = require(`mongoose`);
const Product = require(`../models/productSchema`);
const _ = require("lodash");

const getAllClients = async (req, res) => {
   
  
    try {
      const totalProducts = await Product.find();
      const clients= await _.uniqBy(totalProducts,"cliente")
      console.log(clients.cliente)
      const gananciaCliente=await _.sumBy(_.filter(totalProducts,"cliente"),"precioVenta")
      res.status(200).send({
        clients,
        gananciaCliente,
        totalProducts,
        statusCode: 200,
        message: "Products found",
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