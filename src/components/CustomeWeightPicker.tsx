import React, { useState } from "react";
import "./RulerInput.css"; // Import the CSS for styling

const CustomeWeightPicker = () => {
  const [weight, setWeight] = useState(198); // Default weight set to middle value

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  return (
    <div className="ruler-input-container">
      <div className="">
        <p className="height-display">Weight ({weight} Lbs)</p>
      </div>
      <div className="ruler">
        <input
          type="range"
          min="88"
          max="308"
          value={weight}
          onChange={handleWeightChange}
          className="ruler-slider"
        />
        <div className="ruler-lines">
          {/* Generate the lines for the ruler */}
          {Array.from({ length: 221 }, (_, i) => (
            <div key={i} className={`line ${i % 5 === 0 ? "thick" : ""}`}>
              {i % 10 === 0 && (
                <span className="ruler-number">{i + 88} Lbs</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomeWeightPicker;
