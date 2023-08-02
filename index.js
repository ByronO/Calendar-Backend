const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//express server
const app = express();

//database
dbConnection() 

//Cors
app.use(cors());

//Public
app.use(express.static('public'));

//Body Parser
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(process.env.PORT, () => {
    console.log('Listening on port 4000');
})