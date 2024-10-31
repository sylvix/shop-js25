import Product from '../../models/Product';
import {RequestHandler} from 'express';

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
};

export default getProducts;