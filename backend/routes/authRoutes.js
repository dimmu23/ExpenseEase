const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const fs = require("fs");
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware.js");
const { uploadOnCloudinary } = require("../Utils/cloudinary");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), async(req,res) =>{
      console.log("req.file:", req.file);
    try{
        if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
      
     const result = await uploadOnCloudinary(req.file.path);
   // const imageUrl =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

     fs.unlinkSync(req.file.path);

            if (!result) {
            return res.status(500).json({ message: "Failed to upload image" });
             }

          res.status(200).json({ imageUrl: result.secure_url});
}    catch(error) {
    console.log(error);
    res.status(500).json({message : "Server error"});
}
}
);

module.exports = router;