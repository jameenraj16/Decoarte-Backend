import express from 'express';
import { addProduct, fetchUser, getAllProducts, getCartData, newCollection, popularSofa, removeFromCart, removeProduct, saveToCart } from '../controllers/productController.js';




const productRouter = express.Router()

productRouter.get("/allproducts", getAllProducts)
productRouter.post("/add", addProduct)
productRouter.post("/remove", removeProduct)

productRouter.get("/newcollection", newCollection)
productRouter.get("/popularsofa", popularSofa)

productRouter.post("/addtocart", fetchUser, saveToCart)
productRouter.post("/removefromcart", fetchUser, removeFromCart)
productRouter.post("/getcart",fetchUser,getCartData)

export default productRouter