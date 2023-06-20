const mongoose = require('mongoose')
const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (isValid == false){
        throw new Error("This is not valid or not found")
    }
}

module.exports = {validateMongoDbId}