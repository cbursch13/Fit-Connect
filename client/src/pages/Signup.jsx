import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = data.addUser.token;
      
      Auth.login(token);
    } catch (err) {
      console.error('Error signing up:', err);
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
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Link to="/login" style={{ color: 'white' }}>← Go to Login</Link>

      <Typography variant="h2" gutterBottom>Signup</Typography>
      {error && <Typography variant="body1" color="yellow" gutterBottom>Error: {error.message}</Typography>}
      <form onSubmit={handleFormSubmit} style={{ backgroundColor: 'inherit' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: 'white' } }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: 'white' } }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: 'white' } }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: 'white' } }}
              variant="filled"
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>Submit</Button>
      </form>
    </Container>
  );
}

export default Signup;