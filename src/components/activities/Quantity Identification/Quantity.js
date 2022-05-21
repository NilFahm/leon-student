import './Quantity.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { useNavigate } from 'react-router';
import { Config } from '../../../data/Config';
import { useCommon } from '../../../utils/useCommon';

function Quantity({ sessionid, activityid }) {
    const [dragid, SetDragId] = useState(0);
    const [trueid, setTrueId] = useState(false);
    const [ringimageid, setRingImageId] = useState(null);
    const [dialogbox, setdialogbox] = useState(null)
    const { HideCircularProgress, ShowCircularProgress } = useCommon();
    const [auth] = useLocalStorage("auth", {});
    const [getdata, setgetdata] = useState(null)
    const navigate = useNavigate();
    const [apiobject, setApiObject] = useState({ ob1: 0, ob2: 0, ob3: 0 })
    const successsound = useRef(null)
    const falsesound = useRef(null)

    useEffect(() => {
        Apicall(apiobject)
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
                    Config.baseUrl + "/learners/schedule/" + sessionid + "/activities/5",
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
        if (data != null) {
            debugger
            ev.target.classList.add("hidden");
            await successsound.current.play(true);
            if (data == '5') {
                let obj = { ...apiobject };
                obj.ob1 = 1;
                setApiObject(obj);
                Apicall(obj);
                window.document.getElementById(data).setAttribute("class", "teapott tea");
            } else if (data == '6') {
                let obj = { ...apiobject };
                obj.ob2 = 2;
                setApiObject(obj);
                Apicall(obj);
                window.document.getElementById(data).setAttribute("class", "flower flowert");
            } else if (data == '7') {
                let obj = { ...apiobject };
                obj.ob3 = 3;
                setApiObject(obj);
                Apicall(obj);
                window.document.getElementById(data).setAttribute("class", "bike6 bike");
            }
        } else {
            await falsesound.current.play(true);
        }
    }

    async function fclick(ev) {
        await falsesound.current.play(true)
        ev.target.classList.add("reda13")
    }


    return (
        <div className="d-flex position-relative activity hand">
            <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
            <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
            <img src={"/images/activities/13/BG.svg"} style={{ width: "100%", objectFit: "cover", zIndex: "1" }} draggable={false}/>
            <div>
                <img src={"/images/activities/13/Tea pot.svg"} className="teapot2" id="1" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Tea pot.svg"} className="teapot3" id="1" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Tea pot.svg"} className="teapot1" id="5" onClick={(ev) => click(ev)} />
                <img src={"/images/activities/13/Tea pot.svg"} className="teapot5" id="1" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Tea pot.svg"} className="teapot6" id="1" onClick={(ev => fclick(ev))} />

            </div>
            <div className="">
                <img src={"/images/activities/13/flower.svg"} className="flower1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/flower.svg"} className="flower2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/flower.svg"} className="flower3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/flower.svg"} className="flower6" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/flower.svg"} className="flower5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/flower.svg"} className="flower4" id="6" draggable="false" onClick={(ev) => click(ev)} />
            </div>
            <div className="">
                <img src={"/images/activities/13/Bike.svg"} className="bike1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Bike.svg"} className="bike4" id="7" draggable="false" onClick={(ev) => click(ev)} />
                <img src={"/images/activities/13/Bike.svg"} className="bike3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Bike.svg"} className="bike2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
                <img src={"/images/activities/13/Bike.svg"} className="bike5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
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

export default Quantity;
