require('dotenv').config();
const mongoose = require('mongoose');
// const url = process.env.MONGODB_URL;

mongoose.connection.once('open', () => {
    console.log('succssefully connected');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
const connectMongo = async () => {
//    await  mongoose.connect(url);
}
const disconnectMongo = async () => {
//    await  mongoose.disconnect(url);
}
module.exports = {connectMongo, disconnectMongo};