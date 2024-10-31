import React, { useState } from 'react';
import { LoginMutation } from '@/types';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectLoginError } from '@/features/users/usersSlice';
import { googleLogin, login } from '@/features/users/usersThunks';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginMutation = {
      username: state.username.trim().toLowerCase(),
      password: state.password.trim(),
    };
    await dispatch(login(loginMutation)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate('/');
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
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error.error}
          </Alert>
        )}
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={googleLoginHandler}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3, width: '100%' }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                required
                type="email"
                label="Email"
                name="username"
                autoComplete="current-username"
                value={state.username}
                onChange={inputChangeHandler}
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
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign in
          </Button>
          <Link component={RouterLink} to="/register" variant="body2">
            Or sign up
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
