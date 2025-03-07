import { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { useLogin } from "../../../context/LoginProvider.jsx";

/*
* The Register component is responsible for handling the registration of new users.
* It incorporates form inputs for user details, an image upload button for profile pictures,
* and validation for inputs like email and password.
*/

const Register = ({ onRegister }) => {
  const { signUp } = useLogin();

  const [awaitingResult, setAwaitingResult] = useState(false);

  // Updated formData to just include username, password, and password confirmation
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track if passwords match

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Check if password and password confirmation match
    if (name === "password" || name === "passwordConfirmation") {
      setPasswordsMatch(formData.password === formData.passwordConfirmation);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't submit if passwords don't match
    if (!passwordsMatch) return;

    setAwaitingResult(true);
    const response = await signUp(formData);

    setAwaitingResult(false);

    if (response.success) {
      // Handle successful registration (if needed)
      onRegister && onRegister(); // Optionally notify parent component
    }
  };

  return (
    <>
      <Typography variant="h6" color={"textPrimary"}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={"column"} spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? "Passwords don't match" : ""}
            required
          />
          <Button
            sx={{ borderRadius: "25px" }}
            variant="outlined"
            color="action"
            type="submit"
            fullWidth
            disabled={awaitingResult || !passwordsMatch} // Disable if awaiting result or passwords don't match
          >
            {awaitingResult ? "Registering..." : "Register"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Register;
