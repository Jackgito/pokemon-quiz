import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { useLogin } from "../../../context/LoginProvider.jsx";

const Register = ({ onRegister }) => {
  const { register } = useLogin();

  const [awaitingResult, setAwaitingResult] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameTooLong, setUsernameTooLong] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username") {
      setUsernameTooLong(value.length > 18);
    }
  };

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.passwordConfirmation);
  }, [formData.password, formData.passwordConfirmation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch || usernameTooLong) return;

    setAwaitingResult(true);
    const response = await register(formData);
    setAwaitingResult(false);

    if (response.success) {
      onRegister && onRegister();
    }
  };

  return (
    <>
      <Typography variant="h6" color="textPrimary">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={usernameTooLong}
            helperText={usernameTooLong ? "Username must be 18 characters or less" : ""}
            required
            autoComplete="username"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />
          <Button
            sx={{ borderRadius: "25px" }}
            variant="outlined"
            color="action"
            type="submit"
            fullWidth
            disabled={awaitingResult || !passwordsMatch || usernameTooLong}
          >
            {awaitingResult ? "Registering..." : "Register"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Register;
