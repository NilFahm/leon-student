import './Activity9.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { useNavigate } from 'react-router';
import { Config } from '../../../data/Config';
import { useCommon } from '../../../utils/useCommon';

function Activity9({ sessionid, activityid }) {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);
  const [getde, setGetde] = useState(null)
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const [apiobject, setApiObject] = useState({ ob1: 0, ob2: 0, ob3: 0, ob4: 0, ob5: 0, ob6: 0, ob7: 0, ob8: 0, ob9: 0, ob10: 0, ob11: 0, ob12: 0, ob13: 0, ob14: 0, ob15: 0, ob16: 0 })
  const successsound = useRef(null)
  const [dialogbox, setdialogbox] = useState(null)
  const falsesound = useRef(null)


  useEffect(() => {
    if (apiobject.ob1 == 1 && apiobject.ob2 == 2 && apiobject.ob3 == 3 && apiobject.ob4 == 4 && apiobject.ob5 == 5 && apiobject.ob6 == 6 && apiobject.ob7 == 7 && apiobject.ob8 == 8) {
      setTimeout(() => {
        setdialogbox(true)
      }, 1000);
      setTimeout(() => {
        setdialogbox(false)
      }, 4000);
    }
  }, [apiobject])
  useEffect(() => {
    Apicall(apiobject)
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null)
      }, 2000);
    }
  }, [trueid])
  async function Apicall(obj) {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
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

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    SetDragId(ev.target.id)
    setTrueId(null)
  }


  async function drop(ev, allowid) {
    let value = ev.target.id
    console.log(ev.target.id + "null")
    let data = ev.dataTransfer.getData("text");
    ev.dataTransfer.allowDrop = false;
    if (data == allowid) {
      setTrueId(null);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      if (data == '3') {
        let obj = { ...apiobject };
        obj.ob1 = 1;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(71).setAttribute("class", "cartr3 greenl")
      } else if (data == '2') {
        let obj = { ...apiobject };
        obj.ob2 = 2;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(72).setAttribute("class", "cartr2 greenl")
      } else if (data == '10') {
        let obj = { ...apiobject };
        obj.ob3 = 3;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(77).setAttribute("class", "butterrfytr1 greenl")
      } else if (data == '11') {
        let obj = { ...apiobject };
        obj.ob4 = 4;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(78).setAttribute("class", "butterrfytr2 greenl")
      } else if (data == '4') {
        let obj = { ...apiobject };
        obj.ob5 = 5;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(73).setAttribute("class", "flowerrtr1 greenl")
      } else if (data == '6') {
        let obj = { ...apiobject };
        obj.ob6 = 6;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(74).setAttribute("class", "flowerrtr2 greenl")
      } else if (data == '7') {
        let obj = { ...apiobject };
        obj.ob7 = 7;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(76).setAttribute("class", "bikeetr1 greenl")
      } else if (data == '9') {
        let obj = { ...apiobject };
        obj.ob8 = 8;
        setApiObject(obj);
        Apicall(obj);
        window.document.getElementById(75).setAttribute("class", "bikeetr3 greenl")
      }
    } else if (data == '3' && allowid == '2') {
      let obj = { ...apiobject };
      obj.ob2 = 2;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = 2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(72).setAttribute("class", "cartr2 greenl")
    } else if (data == '2' && allowid == '3') {
      let obj = { ...apiobject };
      obj.ob1 = 1;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = 1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(71).setAttribute("class", "cartr3 greenl")
    } else if (data == '10' && allowid == '11') {
      let obj = { ...apiobject };
      obj.ob4 = 4;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(78).setAttribute("class", "butterrfytr2 greenl")
    } else if (data == '11' && allowid == '10') {
      let obj = { ...apiobject };
      obj.ob3 = 3;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(77).setAttribute("class", "butterrfytr1 greenl")
    } else if (data == '4' && allowid == '6') {
      let obj = { ...apiobject };
      obj.ob6 = 6;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(74).setAttribute("class", "flowerrtr2 greenl")
    } else if (data == '6' && allowid == '4') {
      let obj = { ...apiobject };
      obj.ob5 = 5;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(73).setAttribute("class", "flowerrtr1 greenl")
    } else if (data == '7' && allowid == '9') {
      let obj = { ...apiobject };
      obj.ob8 = 8;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(75).setAttribute("class", "bikeetr3 greenl")
    } else if (data == '9' && allowid == '7') {
      let obj = { ...apiobject };
      obj.ob7 = 7;
      setApiObject(obj);
      Apicall(obj);
      ev.target.classList.add("hidden");
      window.document.getElementById(dragid).classList.add("hidden")
      await successsound.current.play(true);
      // Apicall(ob1 = ob1, ob2 = ob2, ob3 = ob3, ob4 = ob4, ob5 = ob5, ob6 = ob6, ob7 = ob7, ob8 = ob8, ob9 = ob9, ob10 = ob10, ob11 = ob11, ob12 = ob12)
      window.document.getElementById(76).setAttribute("class", "bikeetr1 greenl")
    } else {
      await falsesound.current.play(true);
      setTrueId(allowid);
      window.document.getElementById(value).classList.remove('transbox');
      let data1 = window.document.getElementById(value).classList.value;
      setGetde(data1 + " redl")
    }
  }
  return (
    <div className="d-flex position-relative activity hand">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/9/BG.svg"} style={{ width: "100%", objectFit: "cover", zIndex: "1" }} draggable={false} />
      <div>
        <img src={"/images/activities/9/Car.svg"} className="cars4" id="1" draggable={false}/>
        <img src={"/images/activities/9/Car.svg"} className="cars5" id="2" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/Car.svg"} className="cars6" id="3" draggable={true} onDragStart={(e) => drag(e)} />
      </div>
      <div>
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy1" id="10" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy2" id="11" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy3" id="12" draggable={false}/>
      </div>
      <div className="">
        <img src={"/images/activities/9/flower.svg"} className="flowertr1" id="4" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/flower.svg"} className="flowertr2" id="5" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/flower.svg"} className="flowertr3" id="6" draggable={true} onDragStart={(e) => drag(e)} />
      </div>
      <div className="">
        <img src={"/images/activities/9/Bike.svg"} className="biketr1" id="7" draggable={true} onDragStart={(e) => drag(e)} />
        <img src={"/images/activities/9/Bike.svg"} className="biketr2" id="8" draggable={false}/>
        <img src={"/images/activities/9/Bike.svg"} className="biketr3" id="9" draggable={true} onDragStart={(e) => drag(e)} />
      </div>
      <div onDrop={(e) => drop(e, "3")} id="81" onDragOver={(e) => allowDrop(e)} className="transbox cartr3">
      </div>
      <div onDrop={(e) => drop(e, "2")} id="82" onDragOver={(e) => allowDrop(e)} className="transbox cartr2">
      </div>
      <div onDrop={(e) => drop(e, "10")} id="83" onDragOver={(e) => allowDrop(e)} className="transbox butterrfytr1">
      </div>
      <div onDrop={(e) => drop(e, "11")} id="84" onDragOver={(e) => allowDrop(e)} className="transbox butterrfytr2">
      </div>
      <div onDrop={(e) => drop(e, "4")} id="85" onDragOver={(e) => allowDrop(e)} className="transbox flowerrtr1">
      </div>
      <div onDrop={(e) => drop(e, "6")} id="86" onDragOver={(e) => allowDrop(e)} className="transbox flowerrtr2">
      </div>
      <div onDrop={(e) => drop(e, "7")} id="87" onDragOver={(e) => allowDrop(e)} className="transbox bikeetr1">
      </div>
      <div onDrop={(e) => drop(e, "9")} id="88" onDragOver={(e) => allowDrop(e)} className="transbox bikeetr3">
      </div>
      <div>
        <img src={"/images/activities/9/Car.svg"} id="71" className='hidden' />
        <img src={"/images/activities/9/Car.svg"} id="72" className='hidden' />
        <img src={"/images/activities/9/flower.svg"} id="73" className='hidden' />
        <img src={"/images/activities/9/flower.svg"} id="74" className='hidden' />
        <img src={"/images/activities/9/Bike.svg"} id="75" className='hidden' />
        <img src={"/images/activities/9/Bike.svg"} id="76" className='hidden' />
        <img src={"/images/activities/9/Butterfly.svg"} id="77" className='hidden' />
        <img src={"/images/activities/9/Butterfly.svg"} id="78" className='hidden' />
      </div>
      <div>
        {trueid && <div>
          {ringimageid && dragid == '2' && <img src={"/images/activities/9/car.svg"} className={getde} />}
          {ringimageid && dragid == '3' && <img src={"/images/activities/9/car.svg"} className={getde} />}
          {ringimageid && dragid == '10' && <img src={"/images/activities/9/Butterfly.svg"} className={getde} />}
          {ringimageid && dragid == '11' && <img src={"/images/activities/9/Butterfly.svg"} className={getde} />}
          {ringimageid && dragid == '7' && <img src={"/images/activities/9/Bike.svg"} className={getde} />}
          {ringimageid && dragid == '9' && <img src={"/images/activities/9/Bike.svg"} className={getde} />}
          {ringimageid && dragid == '4' && <img src={"/images/activities/9/flower.svg"} className={getde} />}
          {ringimageid && dragid == '6' && <img src={"/images/activities/9/flower.svg"} className={getde} />}
        </div>}
      </div>
      {dialogbox && dialogbox == true &&<div className="ringimage" style={{
          left: "20%", textAlign: "center",backgroundColor:"black",padding:"15px 50px 30px",borderRadius:"20px"
        }}>
          <h1 style={{ color: "lightgreen" }}>Congratulations! <br />
            Activity completed successfully</h1>
        </div> }
         </div>
  );
}

export default Activity9;
