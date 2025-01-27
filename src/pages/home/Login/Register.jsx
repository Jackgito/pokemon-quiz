import { useState } from 'react';
import {TextField, Button, Typography, Stack, Avatar} from '@mui/material';
import UploadButton from "./UploadButton.jsx";
import {HowToReg} from "@mui/icons-material";
import {useLogin} from "../../../context/LoginProvider.jsx";

/*
* The Register component is responsible for handling the registration of new users.
* It incorporates form inputs for user details, an image upload button for profile pictures,
* and validation for inputs like email and password.
*/

// State initialization for user data, profile image, preview source, and validation flags

const Register = ({onRegister}) => {
    const { signUp } = useLogin()

    const [emailOK, setEmailOK] = useState(true);
    const [awaitingResult, setAwaitingResult] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        pic: "./test2"
    });
    const [previewSrc, setPreviewSrc] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //set awaiting result true to disable the registeration button
        setAwaitingResult(true);
        signUp(formData).then(
         result => {
             if (result === "Success") {
                 console.log("User added.");
                 //Switch to the login page
                 onRegister(true)
             }
             else if (result === "Fail") {
                 console.log("User not added.");
             }
             else {
                 console.log("No result from signUp");
             }
             setAwaitingResult(false);
         }
        )
    }

    const handleImageChange = (file) => {
        setFormData({
            ...formData,
            pic: file,
        });

        //Generate preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
        reader.readAsDataURL(file);
    };

    return (
      <>
        <Typography variant="h6" color={"textPrimary"}>
            Register
        </Typography>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} justifyContent={"center"}>
                        {previewSrc && <Avatar
                          variant={"round"}
                          src={previewSrc}
                          sx={{width: 100, height: 100}}
                          alt="Profile Preview"/>}
                    </Stack>
                    <TextField
                      data-testid = "firstname-field"
                      label="First Name"
                      variant= "outlined"
                      fullWidth
                      type="name"
                      name="first_name"
                      required

                    />
                    <TextField
                      data-testid = "lastname-field"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      type="name"
                      name="last_name"
                      required
                    />

                    <TextField
                      id="email"
                      data-testid = "register-email-field"
                      label={emailOK ? "Email":"Error"}
                      variant=  "outlined"
                      fullWidth
                      type="email"
                      name="email"
                      helperText={emailOK ? "":"Email taken or incorrect"}
                      error={!emailOK}
                      required
                    />
                    <TextField
                      id="password"
                      data-testid = "password-field"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      required
                    />
                    <UploadButton
                      handleImageChange={handleImageChange} >
                    </UploadButton>
                    <Button
                      loading = {awaitingResult}
                      sx={{borderRadius:"25px"}}
                      data-testid = "create-user-button"
                      variant="outlined"
                      color="action"
                      type="submit"
                      fullWidth
                      startIcon={<HowToReg/>}
                    >
                        Register
                    </Button>
                </Stack>
            </form>
      </>
    );
};

export default Register;