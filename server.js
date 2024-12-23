const express = require('express');
//const User = require('./mongo.schema');
const app = express();
app.use(express.json());
const api = require('./router');
//application program interface
app.use('/api/v1', api);

require('dotenv').config();
const port = process.env.PORT;


app.listen(port, () => {
   console.log('server listening 4000 port');
});