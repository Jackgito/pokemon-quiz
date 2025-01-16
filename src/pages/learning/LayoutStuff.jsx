import React from 'react';
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LayoutStuff = () => {
    return (
        <Paper sx={{padding: "16px"}} elevation={4}>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Item>size=8</Item>
                </Grid>
                <Grid size={4}>
                    <Item>size=4</Item>
                </Grid>
                <Grid size={4}>
                    <Item>size=4</Item>
                </Grid>
                <Grid size={8}>
                    <Item>size=8</Item>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default LayoutStuff;