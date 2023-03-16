//definimos los endpoits d elos porductos

const router= require('express').Router()

const { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct}= require (`../controllers/productController`)
// const upload = require('../library/storage')

router.get("/products", getAllProducts)

router.get("/product/:_id",getProduct)

router.post("/products",addProduct)

router.put ("/product/:_id", updateProduct)

router.delete("/product/:_id", deleteProduct)

module.exports=router;

