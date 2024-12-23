const express = require('express');
const app = express.Router();
const Controller = require('./controller')

app.post('/insertData', Controller.insertData);
app.get('/getData', Controller.getData);
/* app.put('/updateData', Controller.updateData);
app.delete('/deleteData', Controller.deleteData); */

module.exports = app;

