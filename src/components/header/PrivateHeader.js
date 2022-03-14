import React from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

const PrivateHeader = () => {
  const [auth] = useLocalStorage("auth", {});
  return (
    <header>
      <a href="#" class="logoBox">
        <img src="/img/logo.svg" />
      </a>
      <div class="topRight">
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
              <img src={auth && auth.avtar ? auth.avtar : "/img/proImg.png"} />
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
        <div class="noti">
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;
