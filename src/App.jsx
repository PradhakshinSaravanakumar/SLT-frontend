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
  const [isRunning, setIsRunning] = useState(false);

  // Start webcam
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

  // Function to capture & send one frame
  const sendFrame = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await fetch("http://localhost:8000/predict/", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.prediction) {
          setResult(data.prediction);
          setAslImage(`alphabet_images/${data.prediction}.jpg`);
          setStatus("✅ Sign recognized");
        } else {
          setResult("--");
          setAslImage("");
          setStatus("⚠️ No hand detected");
        }
      } catch (err) {
        console.error("Error sending frame:", err);
        setStatus("❌ Backend error");
      }
    }, "image/jpeg");
  };

  // Loop every 500ms while running
  useEffect(() => {
    let interval;
    if (isRunning) {
      setStatus("⏳ Live recognition started...");
      interval = setInterval(() => {
        sendFrame();
      }, 500);
    } else {
      setStatus("⏹ Recognition stopped");
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setResult("--");
    setAslImage("");
    setStatus("");
    setIsRunning(false);
  };

  return (
    <div className="container">
      <Header />
      <WebcamBox videoRef={videoRef} />
      <Controls
        onCapture={() => setIsRunning(true)}   // Start
        onReset={handleReset}                  // Stop & reset
      />
      <OutputBox result={result} aslImage={aslImage} />
      <StatusBar status={status} />
    </div>
  );
}
