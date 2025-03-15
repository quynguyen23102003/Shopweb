import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    oderId: {
        type: String,
        default: [true, 'Provide oderId'],
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
        Type: String,
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
    totalAtm: {
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

const oderModel = mongoose.model('oder', oderSchema)

export default oderModel 