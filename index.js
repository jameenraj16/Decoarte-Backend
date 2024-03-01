import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()
app.use(cors())
app.use(express.json({limit:"5mb"}))

const port = 5000
const password = "YFBEFaktbSAk2ixX"

/* API */
app.use("/product", productRouter)
app.use("/user",userRouter )

/* MongoDB connection */
mongoose.connect(
    `mongodb+srv://jameenraj16:${password}@decoarte.xooqeld.mongodb.net/decoarte`
)
    .then(() => app.listen(port))
    .then(() => console.clear())
    .then(() => console.log("Connected to MongoDB on Port: " + port))
    .catch((err) => console.log(err))