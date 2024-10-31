import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Category } from '@/types';
import React from 'react';

interface Props {
  categories: Category[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
  const { categoryId } = useParams();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Categories</Typography>
      </Grid>
      <Grid item>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={!categoryId}>
              <ListItemText primary="All products" />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/categories/${category._id}`}
                selected={category._id === categoryId}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default CategoriesMenu;
