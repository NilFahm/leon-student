import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScheduleData } from "../data/ScheduleData";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
const Schedules = () => {
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const { StudentSchedule } = useScheduleData();
  const { GetRoomToken } = useTwilioData();
  const [scheduledata, setScheduleData] = useState(null);

  useEffect(async () => {
    const response = await StudentSchedule(auth.token);
    if (response) {
      setScheduleData(response[0]);
    }
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
                    <div class="levelHead">
                      {scheduledata.levelName} - Session{" "}
                      {scheduledata.sessionId}
                    </div>
                    <h3>Smart Active</h3>

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
