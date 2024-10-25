import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  ThemeProvider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/toursquare.jpg";
import theme from "../context/theme";
import pic1 from "../assets/pic/pic4.jpg";
import pic2 from "../assets/pic/pic5.jpg";
import pic3 from "../assets/pic/pic6.jpg";
import axios from "axios";

const images = [pic1, pic2, pic3];

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
  });
  const [bgImage, setBgImage] = useState(images[0]);
  const navigate = useNavigate();

  const password = watch("password"); // watch the password for confirm password validation

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        data
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Left side with rotating background Image */}
        <Box
          sx={{
            width: "50%",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 0.5s ease-in-out",
          }}
        />

        {/* Right side with Sign Up Form */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Logo at the top */}
            <Box sx={{ textAlign: "center", mb: 1 }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "300px", height: "auto", marginBottom: "10px" }}
              />
            </Box>

            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
              Create your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
              <TextField
                label="First Name *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("name", {
                  required: "First Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                onBlur={() => trigger("firstName")} // Trigger validation on blur
              />

              {/* Last Name */}
              {/* <TextField
                label="Last Name *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("lastName", { required: "Last Name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
                onBlur={() => trigger("lastName")} // Trigger validation on blur
              /> */}

              {/* Phone Number */}
              {/* <TextField
                label="Phone Number *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]+$/, // Ensure only numbers are entered
                    message: "Phone number must contain only numbers",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Limit input to numbers
                onBlur={() => trigger("phone")} // Trigger validation on blur
              /> */}

              {/* Address */}
              {/* <TextField
                label="Address *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ""}
                onBlur={() => trigger("address")} // Trigger validation on blur
              /> */}

              {/* Email */}
              <TextField
                label="Email *"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    value.includes("@") || 'Email must include "@"',
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                onBlur={() => trigger("email")} // Trigger validation on blur
              />

              {/* Password */}
              <TextField
                label="Password *"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                onBlur={() => trigger("password")} // Trigger validation on blur
              />

              {/* Confirm Password */}
              <TextField
                label="Confirm Password *"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.passwordConfirm}
                helperText={
                  errors.passwordConfirm ? errors.passwordConfirm.message : ""
                }
                onBlur={() => trigger("confirmPassword")} // Trigger validation on blur
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5, fontWeight: "bold" }}
                disabled={!isValid} // Disable button until form is valid
              >
                Sign Up
              </Button>
            </form>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/login")}
                underline="hover"
              >
                Log in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
