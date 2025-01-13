const express = require('express');
const app = express.Router();
const Controller = require('./controller')
const multer = require("multer");
const storage = require("./middlewars/image.upload.middleware");
const upload = multer({
    storage
})

app.post('/insertData', Controller.insertData);
app.get('/getData', Controller.getData);
app.put('/updateData', Controller.updateData);
app.delete('/deleteData', Controller.deleteData);
app.post('/upload', upload.single("img"), Controller.uploadFile);

module.exports = app;

