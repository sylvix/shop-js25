import {RequestHandler} from 'express';
import Product from '../../models/Product';

const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product === null) {
      return res.status(404).send({ error: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    next(error);
  }
};

export default getProductById;