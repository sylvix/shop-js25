import React, { useState } from 'react';
import { User } from '@/types';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/users/usersThunks';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName ? user.displayName : user.username}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        {user.role === 'admin' && (
          <MenuItem component={Link} to="/admin" onClick={handleClose}>
            Admin
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
