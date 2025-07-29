const multer = require("multer");

//configure storage 
const storage = multer.diskStorage({
    destination: (req, file,cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//file filter
const filefilter =(req, file, cb) =>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(aloowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only .jpeg, .jpg, .png formats are allowed'), false);
    }
};

const upload = multer({ storage, filefilter});

module.exports = upload;