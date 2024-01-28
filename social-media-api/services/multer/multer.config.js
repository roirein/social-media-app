const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req, file, 'dest')
        cb(null, path.join(__dirname, '../../public', 'images'))
    },
    filename: function (req, file, cb) {
        console.log(req.body, req.file, 'name')
        const imageType = req.params.imageType
        cb(null, `${imageType}-${req.user._id}-${new Date().getTime()}.${file.mimetype.split('/')[1]}`)
    }
})

const imageFilter = (req, file, cb) => {
    console.log(req.body, req.file, 'filter')
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false)
    }
    return cb(null, true)
}

const upload = multer({
    storage,
    fileFilter: imageFilter
})

module.exports = upload