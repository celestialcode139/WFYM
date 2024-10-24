import React, { useState } from "react";
import "./RulerInput.css"; // Import the CSS for styling

const CustomeHeightPicker = () => {
  const [height, setHeight] = useState(66); // Default height

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div className="ruler-input-container" style={{ position: "relative" }}>
      <div className="" style={{ position: "absolute", top: -20, left: 0 }}>
        <p className="height-display">Height ({height}'')</p>
      </div>
      <div className="ruler">
        <input
          type="range"
          min="48"
          max="84"
          value={height}
          onChange={handleHeightChange}
          className="ruler-slider"
        />
        <div className="ruler-lines">
          {/* Generate the lines for the ruler */}
          {Array.from({ length: 37 }, (_, i) => (
            <div key={i} className={`line ${i % 5 === 0 ? "thick" : ""}`}>
              {i % 5 === 0 && <span className="ruler-number">{i + 48}''</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomeHeightPicker;
