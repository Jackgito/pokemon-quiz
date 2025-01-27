import { useState } from 'react';
import {Divider, Button, Stack, ToggleButton, ToggleButtonGroup} from '@mui/material';
import Login from "./Login.jsx";
import Register from "./Register.jsx";


const LoginAndRegister = () => {
    //Islogin is a state that is used to tell if the login component or register is shown
    const [isLogin, setIsLogin] = useState(true);

    const handleLogInChange = (_event, isLogginIn) => {
      setIsLogin(isLogginIn)
    }

    return (
      <Stack
        margin={"20px"}
        direction={"column"}
        spacing={2}
        data-testid = "login-and-register"
      >
        <ToggleButtonGroup fullWidth color={"primary"} exclusive variant={"outlined"} orientation={"horizontal"} value={isLogin} onChange={handleLogInChange}>
          <ToggleButton value={true}>Login</ToggleButton>
          <ToggleButton value={false}>Register</ToggleButton>
        </ToggleButtonGroup>
        <Divider/>
        {isLogin ? <Login /> : <Register onRegister={setIsLogin}/>}
      </Stack>
    );
};

export default LoginAndRegister;