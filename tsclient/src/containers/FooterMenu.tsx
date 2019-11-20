import React from "react";
import CameraButton from "../components/CameraButton";
import CancelButton from "../components/CancelButton";
import SendButton from "../components/SendButton";

const FooterMenu: React.FC = () => {
  return (
    <div className="FooterMenu">
      <CancelButton />
      <CameraButton />
      <SendButton />
    </div>
  );
};

export default FooterMenu;
