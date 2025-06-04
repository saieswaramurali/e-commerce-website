import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, images, price, offerPrice, stock } = req.body;

    if (!name) {
      return res.status(400).json({ error: "No name is provided" });
    }

    if (!description) {
      return res.status(400).json({ error: "No description is provided" });
    }

    if (!images) {
      return res.status(400).json({ error: "No images are provided" });
    }

    if (!price) {
      return res.status(400).json({ error: "No price is provided" });
    }

    const product = new Product({
      name,
      description,
      images,
      price,
      offerPrice,
      stock,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProducts = (req, res) => {
    res.send('get all products') ; 
} ; 

export const getProduct = (req, res) => {
    res.send('get single product') ; 
} ; 

export const updateProduct = (req, res) => {
    res.send('product is updated') ; 
}

export const deleteProduct = (req, res) => {
    res.send('product is deleted') ; 
}