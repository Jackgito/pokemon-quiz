import  {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Timer = ({time, colors}) => {
    const [progress, setProgress] = useState(0);
    const [curTime, setCurTime] = useState(time);



    useEffect(() => {
        let startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = (Date.now()-startTime) / 1000;
            setCurTime(time-elapsedTime);
            const progressValue = (elapsedTime/time) * 100;

            if (progressValue >= 100) {
                setProgress(100);
                setCurTime(0);
                clearInterval() //Stops the timer
            } else {
                setProgress(progressValue)
            }
        }, 100);

        return () => clearInterval(interval); //Clean on unmount
    }, [time]);

    return (

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progress} size={"20vw"} color={"primary"}/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(curTime)}`}</Typography>
            </Box>
        </Box>
    );
};

export default Timer;