import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("server is ready");
})


app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000');
});

// t5YVbDILio6o890D
// sungginkim528_db_user
// mongodb + srv://sungginkim528_db_user:t5YVbDILio6o890D@cluster0.vddnhgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
