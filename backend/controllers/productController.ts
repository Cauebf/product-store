import { Request, Response } from 'express';
const Product = require('../models/Product');

module.exports.getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find({});

    res.status(200).json({ success: true, data: products });
};

module.exports.createProduct = async (req: Request, res: Response) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        res.status(400).json({
            success: false,
            message: 'Please provide all fields',
        });
        return;
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
    });
};

module.exports.updateProduct = async (req: Request, res: Response) => {
    const {
        params: { id },
        body: { name, price, image },
    } = req;

    if (!name || !price || !image) {
        res.status(400).json({
            success: false,
            message: 'Please provide all fields',
        });
        return;
    }

    const product = await Product.findOneAndUpdate(
        {
            _id: id,
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!product) {
        res.status(404).json({
            success: false,
            message: `No product with id: ${id}`,
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
    });
};

module.exports.deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        res.status(404).json({
            success: false,
            message: `No product with id: ${id}`,
        });
        return;
    }

    res.status(200).json({ success: true, message: 'Product deleted' });
};
