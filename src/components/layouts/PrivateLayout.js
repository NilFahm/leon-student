import React from "react";
import PrivateHeader from "../header/PrivateHeader";

const PrivateLayout = ({ element }) => {
  return (
    <>
      <div className="wapperHome">
        <PrivateHeader />
        {element}
        <div class="bottomBox"></div>
      </div>
    </>
  );
};

export default PrivateLayout;
