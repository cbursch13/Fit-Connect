import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Container, Typography, TextField, Button } from '@mui/material';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <Link to="/signup" style={{ color: 'white' }}>← Go to Signup</Link>

      <Typography variant="h2" gutterBottom> Login </Typography>
      <form onSubmit={handleFormSubmit} style ={{backgroundColor: 'inherit'}}>
        <div style={{ marginBottom: '1rem', backgroundColor: 'white' }}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            variant="filled"
          />
        </div>
        <div style={{ marginBottom: '1rem', backgroundColor: 'white' }}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formState.password}
            variant="filled"
            onChange={handleChange}
          />
        </div>
        {error && (
          <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>Invalid Credentials!</Typography>
        )}
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default Login;