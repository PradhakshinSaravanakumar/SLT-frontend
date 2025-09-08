import React from "react";

function Controls({ onCapture, onReset }) {
  return (
    <div className="buttons">
      <button className="btn primary" onClick={onCapture}>
        📸 Start Capture
      </button>
      <button className="btn secondary" onClick={onReset}>
        🔄 Reset
      </button>
    </div>
  );
}

export default Controls;
