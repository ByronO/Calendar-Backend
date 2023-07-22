const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

//express server
const app = express();

//database
dbConnection()

//Public
app.use(express.static('public'));

//Body Parser
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Listening on port 4000');
})