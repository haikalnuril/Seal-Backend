//import express
const express = require('express')

//import CORS
const cors = require('cors')

//import router
const router = require('./routes')

//init app
const app = express()

//use cors
app.use(cors())

//use body parser
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json())

// app.use(express.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//define routes
app.use('/api', router);

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})