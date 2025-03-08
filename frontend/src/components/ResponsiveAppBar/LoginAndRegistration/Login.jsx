import { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { useLogin } from "../../../context/LoginProvider.jsx";

const Login = () => {
  const { logIn } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formData);
  };

  return (
    <>
      <Typography variant="h6" color="textPrimary">
        Login
      </Typography>
      <Stack direction="column">
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <TextField
              data-testid="username-field"
              label="Username"
              variant="outlined"
              fullWidth
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <TextField
              data-testid="password-field"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <Button
              sx={{ borderRadius: "25px" }}
              data-testid="login-button"
              variant="outlined"
              color="action"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default Login;
