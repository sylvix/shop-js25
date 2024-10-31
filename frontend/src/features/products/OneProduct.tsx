import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectOneProduct, selectOneProductFetching } from './productsSlice';
import { fetchOneProduct } from './productsThunks';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OneProduct = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isFetching = useAppSelector(selectOneProductFetching);

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
          Back to products
        </Button>
      </Grid>
      {isFetching && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {product && (
        <>
          <Grid item component={Typography} variant="h4">
            {product.title}
          </Grid>
          <Grid item component={Typography} variant="h6">
            {product.price} KGS
          </Grid>
          <Grid item component={Typography} variant="body1" dangerouslySetInnerHTML={{ __html: product.description }} />
        </>
      )}
    </Grid>
  );
};

export default OneProduct;
