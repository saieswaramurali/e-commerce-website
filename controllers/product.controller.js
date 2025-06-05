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
    //should include cloudinary at later stage when integrating with the front-end
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

export const getProducts = async (req, res) => {
    
    try {
      const products = await Product.find() ; 

      if(products.length == 0) {
       return res.status(404).json({error: "No Users Exist"}) ; 
      }

      return res.status(200).json(products) ; 

    } catch (error) {
      return res.status(500).json({success: false , error: error.message}) ; 
    }

} ; 

export const getProduct = async (req, res) => {

  try {
    const {id} = req.params ;

    const product = await Product.findById(id) ; 

    if(!product) {
      return res.status(404).json({error: "Product Not Found!"}) ; 
    }

    return res.status(200).json({product}) ; 

  } catch (error) {
    return res.status(500).json({success: false, error: error.message}) ; 
  }

} ; 

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,            
      runValidators: true  
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully", deletedProduct });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
