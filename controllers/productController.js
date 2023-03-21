const mongoose = require(`mongoose`);
const Product = require(`../models/productSchema`);

//se controla los datps del modelo/esquema

//con getAllUsers traigo todos los usurios, lo cual sirve para por ejemplo la pagina de administracion
const getAllProducts = async (req, res) => {
  perPage=50
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    //el try se usa para tener un manejo de errores
    const productsCount = await Product.find().count();
    const totalProducts = await Product.find();
    const products = await Product.find().skip((perPage*page)-perPage).limit(perPage)
    const totalPages=Math.ceil(productsCount/perPage)
    res.status(200).send({
      productsCount,
      totalPages,
      products,
      statusCode: 200,
      message: "Products found",
    });

    // if(!products){
    // res.status(404).json({
    //     statusCode:404,
    //     message: "Producto no encontrado"
    // })

    // } else {
    // res.status(200).send({
    //   products,
    //   statusCode: 200,
    //   message: "Producto encontrado",
    // });
    // }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al buscar productos",
      error: error.message,
    });
  }
};

//una vez que ya traje todos los usuarios necesito tarer un usuario unico par que se pueda logear el usurio o hacer algun filtro por usuario
const getProduct = async (req, res) => {
  const { _id } = req.params;

  try {
    // if(!mongoose.isValidObjectId(_id)){
    //     res.status(400).json({
    //         statusCode:400,
    //         message: "Id invalido"
    //     })
    // }
    const product = await Product.findById({ _id });

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    } else {
      res.status(200).json({
        product,
        statusCode: 200,
        message: "Producto encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al buscar producto",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  const {
    codigo,
    prenda,
    marca,
    categoria,
    cliente,
    fechaIngreso,
    precioVenta,
    estado,
    tiempoEnVenta,
  } = req.body; //del formulario de registro (req.body) traeme name,lastname,email,password, es decir tomo esos datos
  try {
    // if (!product){
    //     res.status(400).json({
    //         statusCode:400,
    //         messege: "Producto ya existe"
    //     })
    // }
    // si es que no existe el usurio lo creamos con new user y traigo los datos de req.body y paso name,lastneme,etc
    const newProduct = new Product({
      ...req.body,
      codigo,
      prenda,
      marca,
      categoria,
      cliente,
      fechaIngreso,
      precioVenta,
      estado,
      tiempoEnVenta,
    });

    // if(req.file){  //si viene un archivo imagen guardalo
    //     const{filename}=req.file;
    //     newProduct.setImgUrl(filename)
    // }

    const product = await newProduct.save();

    res.status(201).send({
      product,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al agregar producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { _id } = req.params;
  const paramsToUpdate = { ...req.body };
  try {
    if (!mongoose.isValidObjectId(_id)) {
      res.status(400).json({
        statusCode: 400,
        message: "Id invalido",
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(_id, paramsToUpdate);

    if (!updateProduct) {
      res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Producto actualizado",
        updateProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { _id } = req.params;

  try {
    // if(!mongoose.isValidObjectId(_id)){
    //     res.status(400).json({
    //         statusCode:400,
    //         message: "Id invalido"
    //     })
    // }
    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Producto eliminado",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
