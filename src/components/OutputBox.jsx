import React from "react";

function OutputBox({ result, aslImage }) {
  return (
    <div className="output">
      <div className="isl-label">
        <h3>Recognized ISL</h3>
        <p>{result}</p>
      </div>
      <div className="asl-animation">
        {aslImage && <img src={aslImage} alt="ASL representation" />}
        <span>ASL representation</span>
      </div>
    </div>
  );
}

export default OutputBox;
