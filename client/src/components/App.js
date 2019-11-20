import React, { useCallback, useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import qs from "querystring";
import "./App.scss";

const App = () => {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [orientationChanged, setOrientationChange] = useState(false);
  const [emailSent, setEmailResponse] = useState(null);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: { exact: "environment" }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if ("onorientationchange" in window) {
      window.addEventListener(
        "orientationchange",
        () => {
          setOrientationChange(!orientationChanged);
        },
        false
      );
    }
  }, []);

  const retake = () => {
    setScreenshot(null);
  };

  const cancel = () => {
    setScreenshot(null);
  };

  const send = () => {
    const requestBody = {
      date: Date.now(),
      blob: screenshot
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios
      .post("api/camera", qs.stringify(requestBody), config)
      .then(() => {
        setEmailResponse(true);
        setTimeout(() => {
          setEmailResponse(null);
        }, 1500);
        setScreenshot(null);
      })
      .catch(() => {
        setEmailResponse(false);
        setTimeout(() => {
          setEmailResponse(null);
        }, 2000);
      });
  };

  return (
    <div className="App">
      {emailSent === true && (
        <div className="tooltip successTooltip">
          <span>Email has been succesfully sent. Check your inbox!</span>
        </div>
      )}
      {emailSent === false && (
        <div className="tooltip ErrorTooltip">
          <span>Email has not been succesfully sent. Please try again!</span>
        </div>
      )}
      <div className="camera">
        {!screenshot ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={screenshot} alt="screenshot" />
        )}
      </div>
      <div className="footer" data-tip>
        {screenshot ? (
          <div className="retake" onClick={retake}>
            Wiederholung
          </div>
        ) : (
          <div className="cancel" onClick={cancel}>
            Abbruch
          </div>
        )}
        <div
          className="capture"
          onClick={() => {
            !screenshot && capture();
          }}
        ></div>
        <div className={`send ${!screenshot ? "disabled" : ""}`} onClick={send}>
          Fertig
        </div>
      </div>
    </div>
  );
};

export default App;
