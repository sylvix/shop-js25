import express from 'express';
import getProducts from './products/getProducts';
import getProductById from './products/getProductById';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductById);

export default productsRouter;
