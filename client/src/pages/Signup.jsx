import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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

      <Typography variant="h2" gutterBottom></Typography>
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
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>Submit</Button>
      </form>
    </Container>
  );
}

export default Signup;