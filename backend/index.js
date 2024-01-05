import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_URL } from './config.js';
import { Book } from './model/bookModel.js';
import bookRoute from './routes/bookesRoutes.js'
import cors from 'cors'
const app = express();

app.use(cors())
  
// app.use(cors({
    // origin:`http://localhost:3000`,
    // methods:['GET','POST','PUT','DELETE'],
    // allowedHeaders:['Content-Type'],

// }))


app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome');
});


app.use('/books', bookRoute)

 
try {
    mongoose.connect(DB_URL);
    console.log(`Database is connected`);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log(error);
}
