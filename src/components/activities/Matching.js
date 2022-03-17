import React, { useEffect, useState, useRef } from "react";
import "./matching.css";
const Matching = () => {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);

  const successsound = useRef(null);
  const falsesound = useRef(null);

  useEffect(() => {
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setRingImageId(dragid);
      }, 2000);
      setTimeout(function () {
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null);
      }, 4000);
    }
  }, [trueid]);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    SetDragId(ev.target.id);
  }

  async function drop(ev, allowid) {
    let data = ev.dataTransfer.getData("text");
    ev.dataTransfer.allowDrop = false;

    if (data == allowid) {
      ev.target.classList.add("hidden");
      await successsound.current.play(true);
      if (data == "1") {
        ev.target.parentNode.appendChild(
          window.document.getElementById(data).setAttribute("class", "div6")
        );
      } else if (data == "2") {
        ev.target.parentNode.appendChild(
          window.document.getElementById(data).setAttribute("class", "div4")
        );
      } else if (data == "3") {
        ev.target.parentNode.appendChild(
          window.document.getElementById(data).setAttribute("class", "div5")
        );
      }
    } else {
      await falsesound.current.play(true);
      ev.dataTransfer.allowDrop = false;
      setTrueId(allowid);
    }
  }

  return (
    <div
      className="d-flex position-relative activity"
      style={{ overflow: "hidden" }}
    >
      <audio
        src={"/images/activities/1/sound/success.mp3"}
        ref={successsound}
      ></audio>
      <audio
        src={"/images/activities/1/sound/false.wav"}
        ref={falsesound}
      ></audio>
      <img
        src={"/images/activities/1/background.png"}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: "1",
        }}
      />
      <div>
        <img
          src={"/images/activities/1/Crab.svg"}
          className="div1 wave1"
          id="1"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
       <div>
        <img
          src={"/images/activities/1/Fish.svg"}
          className="div2 wave1"
          id="2"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
      <div>
        <img
          src={"/images/activities/1/LOBSTER.svg"}
          className="div3 wave1"
          id="3"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
      <div onDrop={(e) => drop(e, "2")} onDragOver={(e) => allowDrop(e)}>
        <img
          src={"/images/activities/1/Fish transparent.svg"}
          draggable="false"
          className="div4 wave2"
        />
      </div>
      <div onDrop={(e) => drop(e, "3")} onDragOver={(e) => allowDrop(e)}>
        <img
          src={"/images/activities/1/lobster transparent.svg"}
          draggable="false"
          className="div5 wave2"
        />
      </div>
      <div onDrop={(e) => drop(e, "1")} onDragOver={(e) => allowDrop(e)}>
        <div>
          <img
            src={"/images/activities/1/Crab transparent.svg"}
            draggable="false"
            className="div6 wave2"
          />
        </div>
      </div>
      {trueid && (
        <div>
          <img src={"/images/activities/1/Ring.svg"} className="ring" />
          {ringimageid && ringimageid == "1" && (
            <img src={"/images/activities/1/Crab.svg"} className="ringimage" />
          )}
          {ringimageid && ringimageid == "2" && (
            <img src={"/images/activities/1/Fish.svg"} className="ringimage" />
          )}
          {ringimageid && ringimageid == "3" && (
            <img
              src={"/images/activities/1/LOBSTER.svg"}
              className="ringimage"
            />
          )}
        </div>
      )}
      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
};

export default Matching;
