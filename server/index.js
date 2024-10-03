import express from 'express';
import bodyParse from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'
import { register } from './controllers/auth.js';
import userRoutes from './routes/users.js';
// Middleware configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(bodyParse.json({ limit: '30mb', extended: true }));
app.use(bodyParse.urlencoded({ limit: '30mb', extended: true }));

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// File storage

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

app.post('/auth/register', upload.single('picture'), register)
app.use('/auth', authRoutes)
app.use('/users', userRoutes);
// Mongoose
const port = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => console.log(`Server is Running on ${port}`))
}).catch((err) => console.log('error' + err))
























