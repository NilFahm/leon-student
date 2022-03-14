import React from "react";

const ClassroomHeader = () => {
  return (
    <>
      <header>
        <a href="#" class="logoBox">
          <img src="/img/logo.svg" />
        </a>
        <div class="topRight">
          <div class="recoTop">
            <a href="#" class="recBtn">
              <img src="/img/recIcon.svg" />
            </a>
            <div class="recTiming"> 00:17:46 </div>
            <a href="#" class="wifiBtn">
              <img src="/img/wifIcon.svg" />
            </a>
            <div class="clear"></div>
          </div>
          <div class="profil">
            <div class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src="/img/proImg.png" />
              </a>
              <div
                class="dropdown-menu  dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a class="dropdown-item" href="#">
                  My Profile
                </a>
                <a class="dropdown-item" href="#">
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
