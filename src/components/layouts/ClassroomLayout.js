import React from "react";
import ClassroomHeader from "../header/ClassroomHeader";

const ClassroomLayout = ({ element }) => {
  return (
    <div className="teachMainBox">
      <div className="wapper">
        <ClassroomHeader />
        {element}
        <div className="bottomBox"></div>
      </div>
    </div>
  );
};

export default ClassroomLayout;
