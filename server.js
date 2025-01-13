const fs = require('fs');
const express = require('express');
const cors = require('cors');//cros origin resource shairing
const morgan = require("morgan");
const {createLogger,format} = require("winston"); //poxarinum e console-in
//const User = require('./mongo.schema');
const app = express();
app.use(express.json());
app.use("/image", express.static("static"));
const api = require('./router');
//application program interface
const corsOptions = {
   origin: "http://localhost:3000",  //frontendi api adreess
   methods: "GET,POST,DELETE",// կիրառվող մեթոդներ
   allowHeaders:["Content-Type", "Authorisation"] //info-ի ձևաչափը

};
const logger = createLogger({
   level: 'info', 
   format: format.combine(
     format.timestamp(),
     format.json()
   )
 });

api.use(cors(corsOptions));
api.use(morgan("dev")) //request-i maasin infon terminalum tesnelu hamar
app.use('/api/v1', api);
app.get("/", (req,res)=>{
res.send("hello world")
})

require('dotenv').config();
const port = process.env.PORT || 4000;


app.listen(port, () => {
logger.info("server running on port 3005")
});
