import React, { RefObject } from "react";
import WebCam from "react-webcam";
// import Camera from "./Camera";
import FooterMenu from "./FooterMenu";
import "./App.scss";

interface AppProps {
  cameraBlob?: string;
  webcam: any;
}

// interface AppState {
//   webcam: Object;
// }

interface AppRefs extends WebCam {
  // webcam: RefObject<WebCam>;
  current: any;
  webcam: any;
}

export class App extends React.Component<AppProps> {
  // private webcam: WebCam & RefObject<WebCam>;
  constructor(props: AppProps) {
    super(props);
    this.webcam = webcam;
    // this.webcam = React.createRef<WebCam>();
  }

  setRef = (webcam: any): void => {
    this.webcam = webcam;
  };

  capture = (): void => {
    const imageSrc = this.webcam.getScreenshot();
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="App">
        <WebCam
          audio={false}
          height={720}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        {/* <FooterMenu /> */}
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}
