import React, { useState, type FC } from "react";

interface Props {
  onOrbClick: () => void;
}

const AnimationManager: FC<Props> = ({ onOrbClick }) => {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    setIsListening(!isListening);
    onOrbClick();
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        style={{
          backgroundColor: isListening ? "#8B0000" : "#556B2F", // Red when listening, forest green otherwise
          border: "none",
          padding: "20px 40px",
          borderRadius: "50px",
          cursor: "pointer",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
      >
        {isListening ? "Click Again to Stop Listening" : "Start Talking"}
      </button>
    </div>
  );
};

export default AnimationManager;
