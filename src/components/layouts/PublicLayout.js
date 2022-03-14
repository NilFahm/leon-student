import React from "react";

const PublicLayout = ({ element }) => {
  return (
    <div>
      <div className="wapperHome">
        <div className="container">
          <div className="homeMainContLogin">{element}</div>
        </div>
      </div>
      <div className="bottomBox"></div>
    </div>
  );
};

export default PublicLayout;
