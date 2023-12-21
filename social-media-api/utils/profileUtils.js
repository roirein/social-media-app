const fs = require('fs')

const deleteImage = (filepath) => {
    fs.unlink(filepath, (err) => {
        if (err) {
            throw err
        }
    })
}

module.exports = {
    deleteImage
}