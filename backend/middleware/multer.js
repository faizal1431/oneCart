import multer from 'multer'

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        // Creates unique name like: 1713456789123-image.jpg
        cb(null, Date.now() + "-" + file.originalname)
    }
});

let upload = multer({ storage })

export default upload