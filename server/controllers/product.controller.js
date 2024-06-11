import Product from "../models/productModel.js";


// Filer, sort, and paginate products
class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));    
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
            return this;
        }else{
            this.query = this.query.sort("-createdAt")
            return this;
        }

    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
        const products = await features.query;
        return res.status(200).json({ products: products, result: products.length });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const { product_id, name, description, price, images, category } = req.body;
        
        if (!images) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        const product = await Product.findOne({ product_id });
        if (product) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const newProduct = new Product({ product_id, name, description, price, images, category }); 
        await newProduct.save();
        return res.status(201).json({ message: "Product created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {   
        return res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { product_id, name, description, price, images, category } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { product_id, name, description, price, images, category });
        return res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getProducts, createProduct, deleteProduct, updateProduct };