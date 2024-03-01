import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const port = 8080
const password = process.env.MONGODB_PASSWORD || "YFBEFaktbSAk2ixX"


/* MongoDB connection */
mongoose.connect(
    `mongodb+srv://jameenraj16:${password}@decoarte.xooqeld.mongodb.net/decoarte`
)
    .then(() => app.listen(port))
    .then(() => console.clear())
    .then(() => console.log(`Connected to MongoDB on Port:${port}`))
    .catch((err) => console.log(err))

/* API */
app.get('/', (req, res) => {
    res.send("Express App is Running...")
})
app.use("/product", productRouter)
app.use("/user", userRouter)


