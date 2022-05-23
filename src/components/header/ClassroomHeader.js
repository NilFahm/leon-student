import React from "react";

const ClassroomHeader = () => {
  return (
    <>
      <header>
        <a href="#" className="logoBox">
          <img src="/img/logo.svg" />
        </a>
        <div className="topRight">
          <div className="recoTop">
            <a href="#" className="recBtn">
              <img src="/img/recIcon.svg" />
            </a>
            <div className="recTiming"> 00:17:46 </div>
            <a href="#" className="wifiBtn">
              <img src="/img/wifIcon.svg" />
            </a>
            <div className="clear"></div>
          </div>
          <div className="profil">
            <div className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src="/img/proImg.png" />
              </a>
              <div
                className="dropdown-menu  dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  My Profile
                </a>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ClassroomHeader;
