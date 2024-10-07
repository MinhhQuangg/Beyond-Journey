import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Link, ThemeProvider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import logo from '../Logo/toursquare.jpg'; 
import theme from '../theme';
import pic1 from './pic/pic1.jpg';
import pic2 from './pic/pic2.jpg';
import pic3 from './pic/pic3.jpg';

const images = [pic1, pic2, pic3];

export const Login = () => {
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm();
  const [bgImage, setBgImage] = useState(images[0]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // navigate('/dashboard'); 
  };

  const email = watch('email'); 

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Left side with rotating background Image */}
        <Box
          sx={{
            width: '50%',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',  
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            transition: 'background-image 0.5s ease-in-out', 
          }}
        />

        {/* Right side with Login Form */}
        <Box
          sx={{
            flexGrow: 1,  
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff', 
            height: '100vh', 
          }}
        >
          <Box sx={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            {/* Logo at the top-left */}
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <img src={logo} alt="Logo" style={{ width: '128px', height: 'auto', marginBottom: '10px' }} />
            </Box>

            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
              Log in to continue
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('email', { 
                  required: 'Email is required',
                  validate: (value) => value.includes('@') || 'Email must contain an @ symbol',
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                onBlur={() => trigger('email')} 
              />

              <TextField
                label="Password *"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                onBlur={() => trigger('password')}
              />

              <Link href="#" sx={{ display: 'block', textAlign: 'right', mb: 2 }}>
                Forgot your password?
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold' }}
                disabled={!email || !!errors.email || !!errors.password} // Disable button if there are errors
              >
                Log in
              </Button>
            </form>

            <Box sx={{ justifyContent: 'flex-start' }}>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Don’t have an account?{' '}
                <Link
                  component="button"
                  onClick={() => navigate('/signup')} // Navigate to signup page
                  underline="hover"
                >
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
