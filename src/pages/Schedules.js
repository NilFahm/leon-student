import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useScheduleData } from "../data/ScheduleData";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useCommon } from "../utils/useCommon";
import { Config } from "../data/Config";
import axios from "axios";

const Schedules = () => {
  const [auth] = useLocalStorage("auth", {});
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const navigate = useNavigate();
  const [scheduledata, setScheduleData] = useState(null);
  const [errormessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    ShowCircularProgress();

    await axios
      .post(
        Config.baseUrl + "/students/schedule",
        {},
        { headers: { Authorization: `bearer ${auth.token}` } }
      )
      .then((response) => {
        setScheduleData(response.data[0]);
        HideCircularProgress();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        HideCircularProgress();
      });
  }, []);

  async function StartSession(sessionid) {
    return navigate("/startcall/" + sessionid);
  }

  return (
    <>
      <div class="container studenConta">
        <div class="homeMainCont">
          <div class="homeMainTop"></div>
          <div class="homeMainBox">
            <h1>Upcoming Classes Today</h1>
            {errormessage && <span className="errorTxt">{errormessage}</span>}

            {scheduledata && (
              <div class="homeBoxLeft FL">
                <div class="homeBox1">
                  <h2>{scheduledata.courseName}</h2>
                  <div class="homeLelvelLeft">
                    <img src="img/homeImg1.png" />
                  </div>

                  <div class="homeLelvel1">
                    <div class="grauBox">8</div>
                    {/* <div class="levelHead"> Level 01 - Session 02</div> */}
                    <div class="levelHead">{scheduledata.levelName}</div>
                    {/* <h3>Smart Active</h3> */}

                    <div class="dateBox">{scheduledata.scheduledStart}</div>
                    {/* <div class="timeBox"> 12:00 PM</div> */}
                    <a
                      href="javascript:void()"
                      class="startBtn"
                      onClick={(e) => StartSession(scheduledata.roomId)}
                    >
                      <img src="img/startBtn.svg" />
                    </a>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            )}

            <div class="homeBoxRight FR">
              <div class="homeBox2">
                <h2>LEON English</h2>
                <div class="homeLelvelLeft">
                  <img src="img/homeImg2.png" />
                </div>

                <div class="homeLelvel1">
                  <div class="grauBox">6</div>
                  <div class="levelHead"> Level 01 - Session 02</div>
                  <h3>Smart Active</h3>
                  <div class="FL mr10">
                    <div class="dateBox"> 01 Oct 2021</div>
                    <div class="timeBox"> 12:00 PM</div>
                  </div>
                  <a href="#" class="FL">
                    {" "}
                    <img src="img/startBtn2.png" />
                  </a>
                  <div class="clear"></div>
                </div>
                <div class="clear"></div>
              </div>

              <div class="homeBox2">
                <h2>LEON Science</h2>
                <div class="homeLelvelLeft">
                  <img src="img/homeImg3.png" />
                </div>

                <div class="homeLelvel1">
                  <div class="grauBox">2</div>
                  <div class="levelHead"> Level 01 - Session 02</div>
                  <h3>Smart Active</h3>
                  <div class="FL mr10">
                    <div class="dateBox"> 01 Oct 2021</div>
                    <div class="timeBox"> 12:00 PM</div>
                  </div>
                  <a href="#" class="FL">
                    {" "}
                    <img src="img/startBtn2.png" />
                  </a>
                  <div class="clear"></div>
                </div>
                <div class="clear"></div>
              </div>
            </div>

            <div class="clear"></div>
            <div class="box-btn text-center mt-20">
              <a href="#" class="btn btn-green">
                My Courses
              </a>
            </div>
          </div>
          <div class="clear"></div>

          <div class="butter1">
            <img src="img/buterfly1.svg" />
          </div>
          <div class="butter2">
            <img src="img/buterfly2.svg" />
          </div>
          <div class="butter3">
            <img src="img/buterfly3.svg" />
          </div>
          <div class="homeLion">
            <img src="img/homeLion.svg" />
          </div>

          <div class="clear"></div>
        </div>
      </div>
    </>
  );
};

export default Schedules;
