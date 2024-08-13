const mongoose = require("mongoose");

// Schema
const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Food Title is require']
        },
        description: {
            type: String,
            required: [true, 'Food Description is require']
        },
        price: {
            type: Number,
            required: [true, 'Food-Price is require']
        },
        imageUrl: {
            type: String,
            default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        foodTags: {
            type: String,
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturant",
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,
        }




    }, { timestamps: true }
)

// export
module.exports = mongoose.model("Foods", foodSchema);