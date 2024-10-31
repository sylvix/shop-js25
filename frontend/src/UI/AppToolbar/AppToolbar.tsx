import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import AnonymousMenu from '@/UI/AppToolbar/AnonymousMenu';
import UserMenu from '@/UI/AppToolbar/UserMenu';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">CompStore</StyledLink>
            </Typography>
          </Grid>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
