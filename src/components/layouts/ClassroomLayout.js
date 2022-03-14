import React from "react";
import ClassroomHeader from "../header/ClassroomHeader";

const ClassroomLayout = ({ element }) => {
  return (
    <div class="teachMainBox">
      <div class="wapper">
        <ClassroomHeader />
        {element}
        <div class="bottomBox"></div>
      </div>
    </div>
  );
};

export default ClassroomLayout;
