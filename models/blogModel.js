const mongoose = require('mongoose'); // Erase if already required


var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required: true,
    },
    numViews:{
        type: Number,
        default: 0,
    },
    isLiked : {
        type: Boolean,
        default: false
    },
    isDisliked : {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        default: "https://revenuearchitects.com/wp-content/uploads/2017/02/shutterstock_767175502-1210x423.jpg"
    },
    author: {
        type: String,
        default: "Admin"
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true,   
    },
    timestamps:true
    
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);