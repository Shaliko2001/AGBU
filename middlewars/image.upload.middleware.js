const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../upload");

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {
        recursive: true
    })
}

module.exports = multer.diskStorage({
    destination(req, file, cb){
        cb(null, uploadDir)
    },
    filename(req, file, cb){
        const validMimes = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];
        if(validMimes.includes(file.mimetype)){
            cb(null, "alfa" + path.extname(file.originalname))
        }else{
            cb(new Error("Invalid file type"), false)
        }
    }
});
