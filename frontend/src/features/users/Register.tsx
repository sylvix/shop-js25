import React, { useState } from 'react';
import { RegisterMutation } from '@/types';
import { Avatar, Box, Button, Grid, TextField, Typography, Link, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { register } from '@/features/users/usersThunks';
import { selectRegisterError } from '@/features/users/usersSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registerMutation = {
        username: state.username.trim().toLowerCase(),
        password: state.password.trim(),
        confirmPassword: state.confirmPassword.trim(),
      };

      await dispatch(register(registerMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error happened
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3, width: '100%' }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                required
                type="email"
                label="Email"
                name="username"
                autoComplete="new-username"
                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                type="password"
                label="Password"
                name="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="new-password"
                value={state.confirmPassword}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('confirmPassword'))}
                helperText={getFieldError('confirmPassword')}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
