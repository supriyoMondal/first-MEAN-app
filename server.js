const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();
//connecting to the database

connectDB();

//bodyparser
app.use(express.json({ extended: false }));
//allow cross origin
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//index route
app.get("/", (req, res) => {
    res.send('hello from app');
})

//user route
app.use("/users", require('./routes/users'));
const PORT = process.env.PORT || 8080;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"))
})

app.listen(PORT)

