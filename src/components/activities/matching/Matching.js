import React, { useEffect, useState, useRef } from "react";
import "./matching.css";

import axios from "axios";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useNavigate } from "react-router";
import { Config } from "../../../data/Config";
import { useCommon } from "../../../utils/useCommon";

const Matching = ({ sessionid, activityid }) => {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const successsound = useRef(null);
  const [dialogbox, setdialogbox] = useState(null);
  const falsesound = useRef(null);
  const [apiobject, setApiObject] = useState({ ob1: 0, ob2: 0, ob3: 0 });
  var ob1, ob2, ob3;

  useEffect(() => {
    if (apiobject.ob1 == 1 && apiobject.ob2 == 2 && apiobject.ob3 == 3) {
      setTimeout(() => {
        setdialogbox(true);
      }, 1000);
      setTimeout(() => {
        setdialogbox(false);
      }, 5000);
    }
  }, [apiobject]);

  useEffect(() => {
    Apicall(apiobject);
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

  async function Apicall(obj) {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
      await axios
        .post(
          Config.baseUrl +
            "/learners/schedule/" +
            sessionid +
            "/activities/" +
            activityid,
          obj,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          console.log(response.data);
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          navigate("/login");
        });
    }
  }

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
      window.document.getElementById(dragid).classList.add("hidden");
      await successsound.current.play(true);
      if (data == "1") {
        let obj = { ...apiobject };
        obj.ob1 = 1;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(11).setAttribute("class", "div6");
      } else if (data == "2") {
        let obj = { ...apiobject };
        obj.ob2 = 2;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(13).setAttribute("class", "div4");
      } else if (data == "3") {
        let obj = { ...apiobject };
        obj.ob3 = 3;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(12).setAttribute("class", "div5");
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
        src={"/images/activities/sound/success.mp3"}
        ref={successsound}
      ></audio>
      <audio
        src={"/images/activities/sound/false.wav"}
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
        draggable={false}
      />
      <div>
        <img
          src={"/images/activities/1/Crab.svg"}
          className="div1 wave1"
          id="1"
          draggable={true}
          onDragStart={(e) => drag(e)}
          // onTouchStart={(e) => drag(e)}
        />
      </div>
      <div>
        <img
          src={"/images/activities/1/Fish.svg"}
          className="div2 wave1"
          id="2"
          draggable={true}
          onDragStart={(e) => drag(e)}
          // onTouchStart={(e) => drag(e)}
        />
      </div>
      <div>
        <img
          src={"/images/activities/1/LOBSTER.svg"}
          className="div3 wave1"
          id="3"
          draggable={true}
          onDragStart={(e) => drag(e)}
          // onTouchStart={(e) => drag(e)}
          // onTouchMove
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
      <div>
        <img src={"/images/activities/1/crab.svg"} id="11" className="hidden" />
        <img
          src={"/images/activities/1/lobster.svg"}
          id="12"
          className="hidden"
        />
        <img src={"/images/activities/1/Fish.svg"} id="13" className="hidden" />
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
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      {dialogbox && dialogbox == true && (
        <div
          className="ringimage"
          style={{
            left: "20%",
            textAlign: "center",
            backgroundColor: "black",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ color: "lightgreen", padding: "10px" }}>
            Congratulations! <br />
            Activity completed successfully
          </h1>
        </div>
      )}
    </div>
  );
};

export default Matching;
