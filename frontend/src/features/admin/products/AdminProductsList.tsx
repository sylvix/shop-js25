import { Button, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAdminProducts, selectAdminProductsFetching } from '@/features/admin/products/adminProductsSlice';
import { Product } from '@/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { fetchAdminProducts } from '@/features/admin/products/adminProductsThunks';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminProductsList = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectAdminProductsFetching);
  const products = useAppSelector(selectAdminProducts);

  const columns: GridColDef<Product>[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'category',
      headerName: 'Category',
      width: 100,
      valueGetter: (_value, row) => row.category.title,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: () => (
        <>
          <IconButton size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/admin/products/new">
            Create new product
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {isFetching && <CircularProgress />}
        <DataGrid
          getRowId={(row) => row._id}
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default AdminProductsList;
