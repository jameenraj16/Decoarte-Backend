import Products from '../models/Product.js';
import Users from "../models/User.js"
import jwt from "jsonwebtoken"

//Get all Products
export const getAllProducts = async (req, res) => {
    try {
        let products = await Products.find({})
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(404).json({ message: "No Products Found" })
        }
    } catch (error) {
        console.log(error);
    }
}

//Add Product
export const addProduct = async (req, res) => {
    const { name, image, category, new_price, old_price, description } = req.body;
    let allproducts = await Products.find({})
    let id;
    if (allproducts.length > 0) {
        let lastProduct_array = allproducts.slice(-1)
        let lastProduct = lastProduct_array[0]
        id = lastProduct.id + 1
    } else {
        id = 1
    }
    try {
        const product = new Products({
            id,
            name,
            image,
            category,
            new_price,
            old_price,
            description
        })
        await product.save();
        console.log("saved..!");
        res.status(200).json({ message: `${name} has added successfully!` });
    } catch (err) {
        console.log(err.message);
    }
}

//Remove Product
export const removeProduct = async (req, res) => {

    try {
        await Products.findOneAndDelete({ id: req.body.id });
        res.status(200).json({ message: `${req.body.name} has removed successfully!` });
    } catch (err) {
        console.log(err.message);
    }
}

//Update Product


//New Collections
export const newCollection = async (req, res) => {
    try {     
        let products = await Products.find({})
        let newCollection = products.slice(1).slice(-8)
        console.log("New collection Fetched successfully")
        res.status(200).json(newCollection)
    } catch (error) {
        console.log(error);
    }
}

//Popular in Sofa
export const popularSofa = async (req, res) => {
    try {
        let products = await Products.find({category:"Sofa"})
        let popularSofa = products.slice(0,4)
        console.log("Popular in Sofa fetched successfully");
        res.status(200).json(popularSofa)
    } catch (error) {
        console.log(error);
    }

}
//Middlware to fetch user
export const fetchUser = async (req, res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({message: "Please Authenticate with valid token"})
    }else{
        try {
            const data =jwt.verify(token,'secret_ecom')
            req.user = data.user;
            next();
        } catch (error) {
            console.log(error);
        }
    }
}
//Save Cart Data To Server
export const saveToCart = async (req, res) => {
try {
    console.log("Added",req.body.ItemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.ItemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.status(200).json({message: "Cart Updated Successfully"})

} catch (error) {
    console.log(error);
}
}
//Remover Cart Data from Server
export const removeFromCart = async (req, res) => {
    console.log("Removed", req.body.ItemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.ItemId]>0){
        try {
            userData.cartData[req.body.ItemId] -= 1
            await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
            res.status(200).json({message: "Cart Updated Successfully"})
        }catch(error){
    console.log(error);
        }
    }
}
//Get Cart Data
export const getCartData = async (req, res) => {
    try {
        console.log("Cart Data");
        let userData = await Users.findOne({_id:req.user.id});
        res.status(200).json(userData.cartData)
        console.log("Cart Data Retrieved Successfully");
    } catch (error) {
        console.log(error);
    }
}