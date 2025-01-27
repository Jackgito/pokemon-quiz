import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoButton = ({ text }) => {
  return (
    <Tooltip
      title={
        <>
          {text.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </>
      }
      arrow
    >
      <IconButton>
        <InfoIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;
