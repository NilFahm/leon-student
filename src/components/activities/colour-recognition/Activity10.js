import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { useNavigate } from 'react-router';
import { Config } from '../../../data/Config';
import { useCommon } from '../../../utils/useCommon';
import "./Activity10.css";

const Activity10 = ({ sessionid, activityid }) => {
  const [getid, setGetid] = useState(null)
  const [trueid, setTrueId] = useState(false);
  const [getde, setGetde] = useState(null)
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const successsound = useRef(null)
  const falsesound = useRef(null)
  const [dialogbox, setdialogbox] = useState(null)
  const [ringimageid, setRingImageId] = useState(null);
  const [apiobject, setApiObject] = useState({ ob1: 0, ob2: 0, ob3: 0, ob4: 0, ob5: 0, ob6: 0, ob7: 0, ob8: 0, ob9: 0, ob10: 0, ob11: 0, ob12: 0 })

  useEffect(() => {
    console.log(sessionid)
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setTrueId(null);
        setRingImageId(null)
      }, 2000);
    }
  }, [trueid])

  useEffect(() => {
    if (apiobject.ob1 == 1 && apiobject.ob2 == 2 && apiobject.ob3 == 3&& apiobject.ob4 == 4 && apiobject.ob5 == 5 && apiobject.ob6 == 6 && apiobject.ob7 == 7 && apiobject.ob8 == 8&& apiobject.ob9 == 9 && apiobject.ob10 == 10 && apiobject.ob11 == 11 && apiobject.ob12 == 12) {
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
    setTimeout(() => {
      console.log("activity", apiobject)
    }, 2000);
  }, [])

  async function Apicall(obj) {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
      debugger
      console.log("api-obj", obj);
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

  async function click(ev) {
    let data = ev.target.id
    setGetid(data)
    if (data != null) {
      console.log(getid)
      if (getid != null) {
        window.document.getElementById(getid).classList.remove("curser")
      }
      if (data == '2') {
        window.document.getElementById(data).setAttribute("class", "orngcray1 curser")
      } else if (data == '8') {
        window.document.getElementById(data).setAttribute("class", "greencray2 curser")
      } else if (data == '4') {
        window.document.getElementById(data).setAttribute("class", "redcray1 curser")
      } else if (data == '5') {
        window.document.getElementById(data).setAttribute("class", "violetcray1 curser")
      } else if (data == '6') {
        window.document.getElementById(data).setAttribute("class", "yellowcray1 curser")
      } else if (data == '7') {
        window.document.getElementById(data).setAttribute("class", "bluecray1 curser")
      }
    }
  }
  async function getdata(ev, allowid) {
    debugger
    let data1 = ev.target.id
    if (allowid != null) {
      if (allowid == '24' && getid == '4') {
        let obj = { ...apiobject };
        obj.ob1 = 1;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(14).setAttribute("class", "redtbox1 greenl")
      } else if (allowid == '22' && getid == '2') {
        let obj = { ...apiobject };
        obj.ob2 = 2;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(12).setAttribute("class", "orgtbox1 greenl")
      } else if (allowid == '26' && getid == '6') {
        let obj = { ...apiobject };
        obj.ob3 = 3;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(16).setAttribute("class", "yellowtbox1 greenl")
      } else if (allowid == '21' && getid == '8') {
        let obj = { ...apiobject };
        obj.ob4 = 4;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(11).setAttribute("class", "greentbox1 greenl")
      } else if (allowid == '27' && getid == '7') {
        let obj = { ...apiobject };
        obj.ob5 = 5;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(17).setAttribute("class", "bluetbox1 greenl")
      } else if (allowid == '25' && getid == '5') {
        let obj = { ...apiobject };
        obj.ob6 = 6;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(15).setAttribute("class", "violettbox1 greenl")
      } else if (allowid == '44' && getid == '4') {
        let obj = { ...apiobject };
        obj.ob7 = 7;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(124).setAttribute("class", "redtbox2 greenl")
      } else if (allowid == '42' && getid == '2') {
        let obj = { ...apiobject };
        obj.ob8 = 8;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(122).setAttribute("class", "orgtbox2 greenl")
      } else if (allowid == '46' && getid == '6') {
        let obj = { ...apiobject };
        obj.ob9 = 9;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(126).setAttribute("class", "yellowtbox2 greenl")
      } else if (allowid == '41' && getid == '8') {
        let obj = { ...apiobject };
        obj.ob10 = 10;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(121).setAttribute("class", "greentbox2 greenl")
      } else if (allowid == '47' && getid == '7') {
        let obj = { ...apiobject };
        obj.ob11 = 11;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(127).setAttribute("class", "bluetbox2 greenl")
      } else if (allowid == '45' && getid == '5') {
        let obj = { ...apiobject };
        obj.ob12 = 12;
        setApiObject(obj);
        Apicall(obj);
        await successsound.current.play(true)
        window.document.getElementById(125).setAttribute("class", "violettbox2 greenl")
      }
      else {
        await falsesound.current.play(true);
        setTrueId(allowid);
        window.document.getElementById(data1).classList.remove('transbox');
        let data = window.document.getElementById(data1).classList.value;
        setGetde(data + " redl")
      }
    }
  }

  return (
    <div className="d-flex position-relative activity hand" id="1">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/10/BG.svg"} style={{ height: "100vh", width: "100vw", objectFit: "cover", zIndex: "1" }} draggable={false}/>
      <div>
        <img src={"/images/activities/10/canvas.svg"} className="paint" draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/orange crayon.svg"} className="orngcray1" id="2" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/Red crayon.svg"} className="redcray1" id="4" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/Voilet crayon.svg"} className="violetcray1" id="5" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/green crayon.svg"} className="greencray2" id="8" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/Yellow crayon.svg"} className="yellowcray1" id="6" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div>
        <img src={"/images/activities/10/blue crayon.svg"} className="bluecray1" id="7" onClick={(e) => click(e)} draggable={false}/>
      </div>
      <div onClick={(e) => getdata(e, "24")} id="34" className="transbox redtbox1">
      </div>
      <div onClick={(e) => getdata(e, "22")} id="32" className="transbox orgtbox1">
      </div>
      <div onClick={(e) => getdata(e, "26")} id="36" className="transbox yellowtbox1">
      </div>
      <div onClick={(e) => getdata(e, "21")} id="31" className="transbox greentbox1">
      </div>
      <div onClick={(e) => getdata(e, "27")} id="37" className="transbox bluetbox1">
      </div>
      <div onClick={(e) => getdata(e, "25")} id="35" className="transbox violettbox1">
      </div>
      <div onClick={(e) => getdata(e, "44")} id="54" className="transbox redtbox2">
      </div>
      <div onClick={(e) => getdata(e, "42")} id="52" className="transbox orgtbox2">
      </div>
      <div onClick={(e) => getdata(e, "46")} id="56" className="transbox yellowtbox2">
      </div>
      <div onClick={(e) => getdata(e, "41")} id="51" className="transbox greentbox2">
      </div>
      <div onClick={(e) => getdata(e, "47")} id="57" className="transbox bluetbox2">
      </div>
      <div onClick={(e) => getdata(e, "45")} id="55" className="transbox violettbox2">
      </div>
      <div>
        <img src={"/images/activities/10/red.svg"} id='14' className='hidden' />
        <img src={"/images/activities/10/Orange.svg"} id='12' className='hidden' />
        <img src={"/images/activities/10/yellow.svg"} id='16' className='hidden' />
        <img src={"/images/activities/10/green.svg"} id='11' className='hidden' />
        <img src={"/images/activities/10/blue.svg"} id='17' className='hidden' />
        <img src={"/images/activities/10/voilet.svg"} id='15' className='hidden' />
        <img src={"/images/activities/10/red.svg"} id='124' className='hidden' />
        <img src={"/images/activities/10/orange.svg"} id='122' className='hidden' />
        <img src={"/images/activities/10/yellow.svg"} id='126' className='hidden' />
        <img src={"/images/activities/10/green.svg"} id='121' className='hidden' />
        <img src={"/images/activities/10/blue.svg"} id='127' className='hidden' />
        <img src={"/images/activities/10/voilet.svg"} id='125' className='hidden' />
      </div>
      {trueid && <div>
        {ringimageid && getid == "1" && <img src={"/images/activities/10/Green.svg"} className={getde} />}
        {ringimageid && getid == "2" && <img src={"/images/activities/10/orange.svg"} className={getde} />}
        {ringimageid && getid == "4" && <img src={"/images/activities/10/red.svg"} className={getde} />}
        {ringimageid && getid == "5" && <img src={"/images/activities/10/voilet.svg"} className={getde} />}
        {ringimageid && getid == "6" && <img src={"/images/activities/10/yellow.svg"} className={getde} />}
        {ringimageid && getid == "7" && <img src={"/images/activities/10/blue.svg"} className={getde} />}
      </div>}
      {dialogbox && dialogbox == true &&<div className="ringimage" style={{
          left: "20%", textAlign: "center",backgroundColor:"black",padding:"15px 50px 30px",borderRadius:"20px"
        }}>
          <h1 style={{ color: "lightgreen" }}>Congratulations! <br />
            Activity completed successfully</h1>
        </div> }
        </div>
  )
}
export default Activity10
