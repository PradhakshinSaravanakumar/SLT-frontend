import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Header from "./components/Header";
import WebcamBox from "./components/WebcamBox";
import Controls from "./components/Controls";
import OutputBox from "./components/OutputBox";
import StatusBar from "./components/StatusBar";

export default function App() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("--");
  const [aslImage, setAslImage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Webcam access denied");
      }
    }
    startWebcam();
  }, []);

  const handleCapture = () => {
    setStatus("⏳ Detecting sign...");
    setTimeout(() => {
      setResult("नमस्ते");
      setAslImage("animations/A.gif");
      setStatus("✅ Sign recognized successfully!");
    }, 1500);
  };

  const handleReset = () => {
    setResult("--");
    setAslImage("");
    setStatus("");
  };

  return (
    <div className="container">
      <Header />
      <WebcamBox videoRef={videoRef} />
      <Controls onCapture={handleCapture} onReset={handleReset} />
      <OutputBox result={result} aslImage={aslImage} />
      <StatusBar status={status} />
    </div>
  );
}
