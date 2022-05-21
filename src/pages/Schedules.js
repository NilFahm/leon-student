import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useScheduleData } from "../data/ScheduleData";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useCommon } from "../utils/useCommon";
import { Config } from "../data/Config";
import axios from "axios";
import Homebox from "../components/schedule/Homebox";

const Schedules = () => {
  const [auth] = useLocalStorage("auth", {});
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const navigate = useNavigate();
  const [scheduledata, setScheduleData] = useState(null);
  const [errormessage, setErrorMessage] = useState(null);

  const [datestring, setDateString] = useState(null);
  const [isclassstart, setIsClassStart] = useState(false);

  useEffect(() => {
    if (scheduledata) {
      setInterval(() => {
        setDateString(
          GetTimeString(scheduledata.scheduledStart, scheduledata.scheduledEnd)
        );
      }, 1000);
    }
  }, [datestring, scheduledata]);

  function GetTimeString(start, end) {
    let secs = (new Date(start) - new Date()) / 1000;
    if (secs > 0) {
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        h: hours,
        m: minutes,
        s: seconds,
      };
      return obj.h + ":" + obj.m + ":" + obj.s;
    } else {
      setIsClassStart(true);
    }
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(async () => {
    ShowCircularProgress();

    await axios
      .get(
        Config.baseUrl + "/learners/schedule",
        { headers: { Authorization: `bearer ${auth.token}` } }
      )
      .then((response) => {
        setScheduleData(response.data.schedule[0]);
        console.log(response.data.schedule)
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
                  <h2>LEON {scheduledata.courseName}</h2>
                  <div class="homeLelvelLeft">
                    <img src="img/homeImg1.png" />
                  </div>

                  <div class="homeLelvel1">
                    <div class="grauBox">{scheduledata.loggedInStudents}</div>
                    {/* <div class="levelHead"> Level 01 - Session 02</div> */}
                    <div class="levelHead">{scheduledata.courseType}</div>
                    <h3>Smart Active</h3>

                    <div class="dateBox">
                      {new Date(scheduledata.startTime).getDate() +
                        " " +
                        months[
                          new Date(scheduledata.startTime).getMonth()
                        ] +
                        " " +
                        new Date(scheduledata.startTime).getFullYear()}
                    </div>
                    <div class="timeBox">
                      {(new Date(scheduledata.startTime).getHours() > 12
                        ? new Date(scheduledata.startTime).getHours() - 12
                        : new Date(scheduledata.startTime).getHours()) +
                        ":" +
                        new Date(scheduledata.startTime).getMinutes() +
                        " " +
                        (new Date(scheduledata.startTime).getHours() > 12
                          ? "PM"
                          : "AM")}
                    </div>
                    {!isclassstart && (
                      <div>
                        Start In <span>{datestring}</span>
                      </div>
                    )}
                    <a
                      href="javascript:void()"
                      class="btn startBtn"
                      onClick={(e) =>
                        isclassstart && StartSession(scheduledata.roomId)
                      }
                    >
                      <img src="img/startBtn.svg" />
                    </a>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            )}
            <Homebox />
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
