import Users from "../models/User.js"
import jwt from "jsonwebtoken"

//Signup User
export const signup = async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        res.status(400).json({ message: "Email Already Exists" })
    } else {
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })
        await user.save()
        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.status(200).json({ token: `${token}` })
    }
}

//Login User
export const login = async (req, res) => {
    try {

        let user = await Users.findOne({ email: req.body.email })
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.status(200).json({ token: `${token}` })
            } else {
                res.status(400).json({ message: "Password Does Not Match" })
            }
        } else {
            res.status(400).json({ message: "Email Not Exists" })
        }
    } catch (error) {
        console.log(error.message);
    }
}