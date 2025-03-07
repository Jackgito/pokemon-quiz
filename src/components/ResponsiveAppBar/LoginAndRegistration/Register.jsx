import { useState } from 'react';
import { TextField, Button, Typography, Stack, Avatar } from '@mui/material';
import UploadButton from "../UploadButton.jsx";
import { HowToReg } from "@mui/icons-material";
import { useLogin } from "../../../context/LoginProvider.jsx";

/*
* The Register component is responsible for handling the registration of new users.
* It incorporates form inputs for user details, an image upload button for profile pictures,
* and validation for inputs like email and password.
*/

const Register = ({ onRegister }) => {
  const { signUp } = useLogin();

  const [emailOK, setEmailOK] = useState(true);
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [file, setFile] = useState('');

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    pic: null
  });
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAwaitingResult(true);
    const response =  await signUp(formData)
    if (response.success && file) {
      const user = response.user;
      const formData = new FormData();
      formData.append('file',file);
      formData.append("id", user._id)
      await sendImage(formData);
    }
    setAwaitingResult(false);
  };

  const sendImage = async (formData) => {
    try {

      const response = await fetch(`/api/users/pic`, {
        method: 'POST',
        body: formData,
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const handleImageChange = (file) => {
    setFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64pic = reader.result;
      setPreviewSrc(base64pic);
    };
  };

  return (
    <>
      <Typography variant="h6" color={"textPrimary"}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} justifyContent={"center"}>
            {previewSrc && (
              <Avatar
                variant={"round"}
                src={previewSrc}
                sx={{ width: 100, height: 100 }}
                alt="Profile Preview"
              />
            )}
          </Stack>
          <TextField
            data-testid="firstname-field"
            label="First Name"
            variant="outlined"
            fullWidth
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            data-testid="lastname-field"
            label="Last Name"
            variant="outlined"
            fullWidth
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            id="email"
            data-testid="register-email-field"
            label={emailOK ? "Email" : "Error"}
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            helperText={emailOK ? "" : "Email taken or incorrect"}
            error={!emailOK}
            required
          />
          <TextField
            id="password"
            data-testid="password-field"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <UploadButton handleImageChange={handleImageChange} />
          <Button
            sx={{ borderRadius: "25px" }}
            data-testid="create-user-button"
            variant="outlined"
            color="action"
            type="submit"
            fullWidth
            startIcon={<HowToReg />}
            disabled={awaitingResult}
          >
            {awaitingResult ? "Registering..." : "Register"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Register;
