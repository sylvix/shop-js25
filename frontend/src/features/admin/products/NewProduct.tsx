import ProductForm from './ProductForm';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ProductMutation } from '@/types';
import { useNavigate } from 'react-router-dom';
import { selectAdminProductCreating } from '@/features/admin/products/adminProductsSlice';
import { createAdminProduct } from '@/features/admin/products/adminProductsThunks';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectAdminProductCreating);

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createAdminProduct(productMutation));
      navigate('/');
    } catch (error) {
      // handle error
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New product
      </Typography>
      <ProductForm onSubmit={onFormSubmit} isLoading={isCreating} />
    </>
  );
};

export default NewProduct;
