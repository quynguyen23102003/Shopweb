import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'product'
    },
    product_details: {
        name: String,
        image: Array
    },
    paymentId: {
        type: String,
        default: ''
    },
    payment_status: {
        type: String,
        default: ''
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    delivery_status: {
        type: String,
        default: ''
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ''
    },
    // createdAt : {
    //     type : Date,
    //     default : ''
    // },
    // updatedAt : {
    //     type : Date,
    //     default : ''
    // }
}, {
    timestamps: true
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel 