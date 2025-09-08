import React from "react";

function WebcamBox({ videoRef }) {
  return (
    <div className="webcam-box">
      <div className="live-tag">🔴 Live</div>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
}

export default WebcamBox;
