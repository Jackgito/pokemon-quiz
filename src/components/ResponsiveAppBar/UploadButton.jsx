import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//This component is a buttton that takes a function in to set image in the parent component.
function UploadButton({handleImageChange}) {

    //Get the image file from the event and pass it to the parent component
    const handleFileInput = (e) => {
        if (e.target.files[0]) {
            handleImageChange(e.target.files[0]);
        }
    }
    return (
        <Button
          sx={{borderRadius:"25px"}}
          variant="outlined"
          color={"action"}
          component="label"
          startIcon={<CloudUploadIcon />}
        >
            Upload Profile Picture
            <input
                data-testid = "picture-field"
                type="file"
                hidden
                onChange={handleFileInput}
            />
        </Button>
    );
}
export default UploadButton;