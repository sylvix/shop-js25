import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminMenu from '@/features/admin/components/AdminMenu';

const AdminLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sx={{ width: 200 }}>
        <AdminMenu />
      </Grid>
      <Grid item xs>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
