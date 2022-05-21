import './Activity.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { useNavigate } from 'react-router';
import { Config } from '../../../data/Config';
import { useCommon } from '../../../utils/useCommon';


function Activity3({ sessionid, activityid }) {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [auth] = useLocalStorage("auth", {});
  const [getdata, setgetdata] = useState(null)
  const navigate = useNavigate();
  const [apiobject, setApiObject] = useState({ ob1: 0, ob2: 0, ob3: 0 })
  const successsound = useRef(null)
  const [dialogbox, setdialogbox] = useState(null)
  const falsesound = useRef(null)
  

  useEffect(() => {
    Apicall(apiobject)
  }, [])

  useEffect(() => {
    if (apiobject.ob1 == 1 && apiobject.ob2 == 2 && apiobject.ob3 == 3) {
      setTimeout(() => {
        setdialogbox(true)
      }, 2000);
      setTimeout(() => {
        setdialogbox(false)
      }, 5000);
    }
  }, [apiobject])

  async function Apicall(obj) {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
      debugger
      await axios
        .post(
          Config.baseUrl + "/learners/schedule/" + sessionid + "/activities/" + activityid,
          obj,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          console.log(response.data)
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          navigate("/login");
        });
    }
  }

  useEffect(() => {
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setRingImageId(dragid);
      }, 2000);
      setTimeout(function () {
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null)
      }, 4000);
    }
  }, [trueid])

  async function click(ev) {
    debugger
    let data = ev.target.id
    if (data != null) {
      await successsound.current.play(true);
      ev.target.classList.add("hidden");

      if (data == '5') {
        let obj = { ...apiobject };
        obj.ob1 = 1;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(data).setAttribute("class", "umbrellat theme1");
      } else if (data == '6') {
        let obj = { ...apiobject };
        obj.ob2 = 2;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(data).setAttribute("class", "ballt theme2");
      } else if (data == '7') {
        let obj = { ...apiobject };
        obj.ob3 = 3;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(data).setAttribute("class", "shirtt theme3");
      }
    }
  }
  // function Dialog() {
  //   debugger
  //   if (apiobject.ob1 == 1 && apiobject.ob2 ==2 && apiobject.ob3 == 3) {
  //     console.log("done")
  //     alert(
  //      "Congratulations!  Activity completed successfully")
  //   }
  // }

  async function fclick(ev) {
    debugger
    var data = ev.target.id
    ev.target.classList.add("redalert")
    await falsesound.current.play(true);
    setTimeout(() => {
      ev.target.classList.remove("redalert")
    }, 2000);
  }


  return (
    <div className="d-flex position-relative activity hand">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/3/BG.svg"} style={{ ob1jectFit: "fill", zIndex: "1", width: "100%", height: "100%" }} />
      <div>
        <img src={"/images/activities/3/racket.svg"} className="racket1" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket2" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket3" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/Umbrella.svg"} className="umbrela" id="5" onClick={(ev) => click(ev)} style={{ height: "10%" }} />
        <img src={"/images/activities/3/racket.svg"} className="racket5" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket6" id="1" onClick={(ev => fclick(ev))} />

      </div>
      <div className="">
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon4" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/ball.svg"} className="ball" id="6" draggable="false" onClick={(ev) => click(ev)} />
      </div>
      <div className="">
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/blue shirt.svg"} className="shirt2" id="7" draggable="false" onClick={(ev) => click(ev)} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt4" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt6" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        {/* <div style={{zIndex:"10"}}> Select Activity</div> */}
        {/* <button variant="primary" onClick={handleShow}>
        Launch demo modal
      </button> */}
 {dialogbox && dialogbox == true &&<div className="ringimage" style={{
          left: "20%", textAlign: "center",backgroundColor:"black",padding:"15px 50px 30px",borderRadius:"20px"
        }}>
          <h1 style={{ color: "lightgreen" }}>Congratulations! <br />
            Activity completed successfully</h1>
        </div> } <img src={"/images/activities/3/basket.svg"} className="basket" id="2" draggable="false" />
      </div>
    </div>
  );
}

export default Activity3;
