import {Router} from 'express' ; 
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const productsRouter = Router() ; 

productsRouter.post("/", createProduct) ; 

productsRouter.get("/", getProducts) ; 

productsRouter.get("/:id", getProduct) ;

productsRouter.put("/:id", updateProduct); 

productsRouter.delete("/:id", deleteProduct) ; 

export default productsRouter ; 