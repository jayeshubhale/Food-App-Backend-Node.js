const mongoose = require("mongoose");

// Schema
const resturantSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Resturent title is required"]
        },
        imgeUrl: {
            type: String,

        },
        foods: {
            type: Array,
        },
        time: {
            type: String,
        },
        pickup: {
            type: Boolean,
            default: true,
        },
        delivery: {
            type: Boolean,
            default: false
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        logoUrl: {
            type: String,
        },
        rating: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,
        },
        code: {
            type: String,
        },
        coords: {
            id: { type: String, },
            latitude: { type: Number },
            latitudeDelta: { type: Number },
            longitude: { type: Number },
            longitudeDelta: { type: Number },
            address: { type: String },
            title: { type: String }
        },
    },
    { timestamps: true }
)

// export
module.exports = mongoose.model("Resturant", resturantSchema);