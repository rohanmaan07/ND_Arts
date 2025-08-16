const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",  // changed here
        default: null
    },
    level: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Category = mongoose.model("Category", CategorySchema);  // changed here
module.exports = Category;
