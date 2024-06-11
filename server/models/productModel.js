import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        product_id: {  
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: Object,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", 
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        sold: {
            type: Number,
            default: 0
        }
    },{
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;