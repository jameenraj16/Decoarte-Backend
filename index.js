import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import path from "path"
import fileUpload from 'express-fileupload'

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
dotenv.config()

const port = 5000
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

/* File Upload */

app.post('/upload', (req, res) => {
    let product;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: 0,
            message: 'No files were uploaded.'
        });
    }
    const uploadDir = './upload/images';
    product = req.files.product;
    uploadPath = path.join(process.cwd(), uploadDir, product.name);
    product.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: 'Error uploading file.'
            });
        }
        res.json({
            success: 1,
            message: 'File uploaded successfully',
            image_URL: uploadPath // Assuming uploadPath contains the URL of the uploaded image
        });
    });
});


/* const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

//Createing the upload endpoint
app.use('/images', express.static('./upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        res.json({
            success: 1,
            message: 'File uploaded successfully',
            image_URL: `http://localhost:${port}/images/${req.file.filename}`
        })
    } catch (error) {
        console.log(error);
    }
}) */