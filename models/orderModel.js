const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            count: Number,
            color: String
        }
    ],
    paymentIntent:{},
    orderStatus: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "cash on delivery", "Processing", "dispatched", "cancelled", "delivered"]
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },       
}, {
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);