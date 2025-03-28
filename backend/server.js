require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");
const PORT = 5001;

app.use(cors());
app.use(express.json());

const exerciseRoutes = require("./Routes/exerciseRoutes");

app.use('/exercises', exerciseRoutes);
app.use('/category', exerciseRoutes);
app.use('/api', exerciseRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins, adjust as necessary
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

app.listen(PORT, () => {
    connectDB();
    console.log(`Serve is running at ${PORT}`);
})