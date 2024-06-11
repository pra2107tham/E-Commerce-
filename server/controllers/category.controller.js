import Category from '../models/categoryModel.js';

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category
            .findOne({ name });
        if (category) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const newCategory = new Category({ name });
        await newCategory.save();
        return res.status(201).json({ message: "Category created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate(req.params.id, { name });
        return res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getCategories, createCategory, deleteCategory, updateCategory };