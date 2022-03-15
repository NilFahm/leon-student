import React from "react";

const ParticipantNotConnected = () => {
  return (
    <div className="studListBox position-relative d-flex align-items-center justify-content-center">
      <img
        src="/img/novideoImg1.png"
        style={{
          height: "100%",
          width: "100%",
          zIndex: "1",
        }}
      />
      <div class="novidShow d-flex align-items-center justify-content-center">
        <img src="/img/novideoImg1Inner.svg" style={{ zIndex: "2" }} />
      </div>
    </div>
  );
};

export default ParticipantNotConnected;
