require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/db.js");
const PORT = 5001;

app.use(express.json());

const exerciseRoutes = require("./Routes/exerciseRoutes");

app.use('/exercises', exerciseRoutes);
app.use('/category', exerciseRoutes);
app.use('/api', exerciseRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Serve is running at ${PORT}`);
})