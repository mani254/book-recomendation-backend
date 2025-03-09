const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'books',
      format: async (req, file) => 'png',
      public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
   },
});


const upload = multer({ storage });

module.exports = upload.single('image'); 
