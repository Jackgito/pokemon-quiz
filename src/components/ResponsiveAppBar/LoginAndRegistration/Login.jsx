import { useState } from 'react';
import {TextField, Button, Typography, Stack} from '@mui/material';
import {useLogin} from "../../../context/LoginProvider.jsx";

const Login = () => {
  const { logIn } = useLogin()

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
        ...formData,
        [name]: value
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formData);
  };

  return (
    <>
      <Typography variant="h6" color={"textPrimary"}>
        Login
      </Typography>
        <Stack direction={"column"}>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Stack direction={"column"} spacing={2}>
                    <TextField
                      data-testid= "email-field"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      name="email"
                      //helperText={!wrongEmail ? "":"Incorrect Email"}
                      //error={wrongEmail}
                      required
                      //onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      data-testid= "password-field"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      //helperText={!wrongPassword ? "":"Password incorrect"}
                      //error={wrongPassword}
                      required
                      //onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      sx={{borderRadius:"25px"}}
                      data-testid="login-button"
                      variant="outlined"
                      color="action"
                      type="submit" fullWidth>
                        Login
                    </Button>
                </Stack>
            </form>
    </Stack>
    </>
  );
};
export default Login;