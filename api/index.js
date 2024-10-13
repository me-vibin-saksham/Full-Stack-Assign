const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,  
    origin: "http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));

app.use('/auth', authRoutes);  

app.get("/test", (req, res) => {
    res.json('test ok');
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
