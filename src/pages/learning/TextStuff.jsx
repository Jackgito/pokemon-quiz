import {Divider, Typography} from "@mui/material";

const TextStuff = () => {
    return (
        <>
            <Typography variant={"h5"} gutterBottom={true} textAlign={"center"}> This component showcases the text styles for Material UI</Typography>
            <Divider></Divider>
            <Typography variant={"h1"} > This is h1</Typography>
            <Typography variant={"h2"} > This is h2</Typography>
            <Typography variant={"h3"} > This is h3</Typography>
            <Typography variant={"h4"} gutterBottom={true}> This is h4, gutterBottom adds space below</Typography>
            <Typography variant={"h5"} > This is h5</Typography>
            <Typography variant={"h6"} > This is h6</Typography>
            <Typography variant={"subtitle1"} > This is subtitle1</Typography>
            <Typography variant={"subtitle2"} > This is subtitle1</Typography>
            <Typography variant={"body1"} > This is body1, (default)</Typography>
            <Typography variant={"body2"} > This is body2</Typography>
        </>
    );
};

export default TextStuff;