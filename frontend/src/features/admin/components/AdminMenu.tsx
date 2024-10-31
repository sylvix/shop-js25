import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Admin menu</Typography>
      </Grid>
      <Grid item>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/products">
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/categories">
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/users">
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
