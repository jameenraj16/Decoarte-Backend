import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import multer from 'multer';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;
const password = process.env.MONGODB_PASSWORD || 'YFBEFaktbSAk2ixX';

/* MongoDB connection */
mongoose.connect(`mongodb+srv://jameenraj16:${password}@decoarte.xooqeld.mongodb.net/decoarte`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.clear();
  console.log("Connected to MongoDB on Port: " + port);
  app.listen(port, () => {
    console.log("Express App is Running...");
  });
})
.catch((err) => console.log(err));

/* API */
app.use("/product", productRouter);
app.use("/user", userRouter);

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Creating the upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
  try {
    res.json({
      success: 1,
      message: 'File uploaded successfully',
      image_URL: `http://localhost:${port}/images/${req.file.filename}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: 0, message: 'Internal server error' });
  }
});

// Serving uploaded images
app.use('/images', express.static(path.join(__dirname, 'upload', 'images')));


//