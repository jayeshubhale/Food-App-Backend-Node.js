const mongoose = require("mongoose");

// Schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Category Title is required"]
        },
        imageUrl: {
            type: String,
            default:
                "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
        },

    },
    { timestamps: true }
)

// export
module.exports = mongoose.model("Category", categorySchema);
