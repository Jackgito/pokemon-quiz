/*
	jsrepo 1.31.0
	Installed from https://reactbits.dev/default/
	6.2.2025
*/

import './ShinyText.css';

// HEX colors don't seem to work
const ShinyText = ({ text, disabled, speed, color, shineColor }) => {
  const style = {
    animationDuration: `${speed}s`,
    backgroundImage: color ? `linear-gradient(120deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)` : undefined,
  };

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${color ? 'dynamic-color' : ''}`}
      style={style}
    >
      {text}
    </span>
  );
};

export default ShinyText;
