import mongoose, { Types } from 'mongoose';
import Category from './Category';

const Schema = mongoose.Schema;

const ParameterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
})

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  parameters: [ParameterSchema],
  image: String,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;