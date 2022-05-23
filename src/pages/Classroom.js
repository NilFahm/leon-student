import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
import Participant from "../components/call/Participant";
import Video from "twilio-video";
import LocalParticipant from "../components/call/LocalParticipant";
import TeacherParticipant from "../components/call/TeacherParticipant";
import ParticipantNotConnected from "../components/call/ParticipantNotConnected";
import Chat from "../components/call/Chat";
import io from "socket.io-client";
import TeacherNormalView from "../components/call/TeacherNormalView";
import Matching from "../components/activities/matching/Matching";
import Activity3 from "../components/activities/Observing-ability/Activity";
import Activity10 from "../components/activities/colour-recognition/Activity10";
import Activity9 from "../components/activities/discrimination/Activity9";
import Quantity from "../components/activities/Quantity Identification/Quantity";
import Mapping from "../components/activities/Mapping-ability/Mapping";

const Classroom = () => {
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState("");
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);
  const [isactivity, setIsActivity] = useState(false);
  const [activityname, setActivity] = useState(null);
  const [activityid, setactivityid] = useState(null);
  const [currenttab, setCurrentTab] = useState(1);

  const socket = io.connect("https://socket.fahm-technologies.com");

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const response = await GetRoomToken(auth.token, sessionid);
      //setTwilioToken(response.authToken);
      const joindata = { userid: auth.id, roomname: sessionid };
      socket.emit("joinroom", joindata);
      setCurrentTab(1);
    }
  }, [auth]);

  const remoteParticipants = participants
    .filter((x) => x.identity !== "azizi@leonclassroom.com")
    .map((participant, index) => (
      <li key={index}>
        <Participant key={participant.sid} participant={participant} />
      </li>
    ));

  const teacherParticipant = participants.filter(
    (x) => x.identity === "azizi@leonclassroom.com"
  );

  useEffect(() => {
    navigate("/startcall/" + sessionid);
  }, [isactivity]);

  useEffect(() => {
    if (twiliotoken && twiliotoken !== "") {
      const participantConnected = (participant) => {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);
      };
      const participantDisconnected = (participant) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      };

      Video.connect(twiliotoken, {
        name: sessionid,
      }).then((room) => {
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      });
      return () => {
        setRoom((currentRoom) => {
          if (
            currentRoom &&
            currentRoom.localParticipant.state === "connected"
          ) {
            currentRoom.localParticipant.tracks.forEach(function (
              trackPublication
            ) {
              trackPublication.track.stop();
            });
            currentRoom.disconnect();
            return null;
          } else {
            return currentRoom;
          }
        });
      };
    }
  }, [sessionid, twiliotoken]);

  useEffect(() => {
    socket.on("activity", (data) => {
      console.log("activity", data);
      if (
        data.activity.toString() !== activityname &&
        data.activity !== "startcall" &&
        data.activity !== "endcall"
      ) {
        setActivity(data.activity);
        setactivityid(data.activityid);
        console.log(data.activityid);
        console.log(data.activity);
        setIsActivity(true);
        if (currenttab === 1) {
          setCurrentTab(3);
        }
      } else if (data.activity === "endcall") {
        EndCall();
      } else {
        setActivity(null);
        setIsActivity(false);
        setCurrentTab(1);
      }
    });
  }, [socket]);

  async function EndCall() {
    setTwilioToken("");
    window.location.href = "/schedules";
  }

  async function VideoOnOff(on) {
    if (on) {
      room.localParticipant.videoTracks.forEach(function (track, trackId) {
        track.track.disable();
      });
    } else {
      room.localParticipant.videoTracks.forEach(function (track, trackId) {
        track.track.enable();
      });
    }
    setIsVideoOn(!on);
  }

  async function AudioOnOff(on) {
    if (on) {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.disable();
      });
    } else {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.enable();
      });
    }
    setIsAudioOn(!on);
  }

  return (
    <>
      <div className="container">
        <div className="arrowTop"></div>
        <div className="topBg"></div>
        <div className="innerContain">
          <div className="frameLeft1 FL">
            {isactivity ? (
              <>
                <div className="innHeader" style={{ zIndex: "100" }}>
                  <h2>
                    {activityname &&
                      activityname === "whiteboard" &&
                      "White Board"}
                    {activityname && activityname == 3 && "Matching"}
                    {activityname && activityname == 1 && "Observing ability"}
                    {activityname && activityname == 2 && "Colour-recognition"}
                    {activityname && activityname == 4 && "Discrimination"}
                    {activityname &&
                      activityname == 5 &&
                      "Quantity identification"}
                    {activityname && activityname == 6 && "Mapping Ability"}
                  </h2>
                </div>

                <div
                  className="viewImg1"
                  style={{
                    pointerEvents:
                      activityname && activityname === "whiteboard"
                        ? "none"
                        : "auto",
                  }}
                >
                  <div className="whiteBoardBox position-relative">
                    {activityname && activityname == 3 && (
                      <>
                        <Matching
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname == 1 && (
                      <>
                        <Activity3
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname == 2 && (
                      <>
                        <Activity10
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname == 4 && (
                      <>
                        <Activity9
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname == 5 && (
                      <>
                        <Quantity
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname == 6 && (
                      <>
                        <Mapping
                          sessionid={sessionid}
                          activityid={activityname}
                        />
                      </>
                    )}{" "}
                    {activityname && activityname === "whiteboard" && (
                      <iframe
                        src={
                          "https://whiteboard.fahm-technologies.com/?whiteboardid=67c215e2-f2f4-49da-9c18-2f0df7c6fe81"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {teacherParticipant && teacherParticipant.length > 0 ? (
                  teacherParticipant.map((participant) => (
                    <TeacherParticipant
                      key={participant.sid}
                      participant={participant}
                    />
                  ))
                ) : (
                  <>
                    <div className="viewImg1">
                      <div className="whiteBoardBox position-relative">
                        <img src="/img/novideoImg1.png" />
                        <div className="novidShow d-flex align-items-center justify-content-center">
                          <img src="/img/novideoImg1Inner.svg" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="frameRight1 FR">
            <div className="viewTabs1">
              <div className="tab-content" id="myTabContent">
                {isactivity && (
                  <div
                    className={
                      currenttab === 3
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="teamList"
                    role="tabpanel"
                    aria-labelledby="teamList-tab"
                  >
                    <ul className="whiteListMain">
                      <li>
                        {teacherParticipant && teacherParticipant.length > 0 ? (
                          teacherParticipant.map((participant) => (
                            <TeacherNormalView
                              key={participant.sid}
                              participant={participant}
                            />
                          ))
                        ) : (
                          <>
                            <div className="whiteBoardBox position-relative">
                              <img src="/img/novideoImg1.png" />
                              <div className="novidShow d-flex align-items-center justify-content-center">
                                <img src="/img/novideoImg1Inner.svg" />
                              </div>
                            </div>
                          </>
                        )}
                      </li>

                      {room ? (
                        <li key={"lifrom"}>
                          <LocalParticipant
                            key={room.localParticipant.sid}
                            participant={room.localParticipant}
                            isaudioon={isaudioon}
                            isvideoon={isvideoon}
                          />
                        </li>
                      ) : (
                        <li key={"lipnotcon"}>
                          <ParticipantNotConnected />
                        </li>
                      )}

                      <div className="clear"></div>
                    </ul>
                  </div>
                )}

                <div
                  className={
                    currenttab === 1
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }
                  id="studList"
                  role="tabpanel"
                  aria-labelledby="studList-tab"
                >
                  <ul className="studList studList2 studList3">
                    <li key={"listulist"}>
                      {room ? (
                        <LocalParticipant
                          key={room.localParticipant.sid}
                          participant={room.localParticipant}
                          isaudioon={isaudioon}
                          isvideoon={isvideoon}
                        />
                      ) : (
                        <ParticipantNotConnected />
                      )}
                    </li>
                    {remoteParticipants}
                    {Array.from(
                      Array(7 - remoteParticipants.length),
                      (e, i) => {
                        return (
                          <li key={"lip" + i}>
                            <ParticipantNotConnected />
                          </li>
                        );
                      }
                    )}
                    <div className="clear"></div>
                  </ul>
                </div>

                <div
                  className={
                    currenttab === 2
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }
                  id="chatList"
                  role="tabpanel"
                  aria-labelledby="chatList-tab"
                >
                  <Chat socket={socket} sessionid={sessionid} />
                </div>
              </div>
              <ul
                className={
                  isactivity
                    ? "nav nav-tabs tabsNew tabsNew2"
                    : "nav nav-tabs tabsNew"
                }
                id="myTab"
                role="tablist"
              >
                {isactivity && (
                  <li className="nav-item" role="presentation">
                    <a
                      className={
                        currenttab === 3 ? "nav-link active" : "nav-link"
                      }
                      id="teamList-tab"
                      data-toggle="tab"
                      href="#teamList"
                      role="tab"
                      aria-controls="teamList"
                      aria-selected="true"
                    >
                      List
                    </a>
                  </li>
                )}

                <li className="nav-item" role="presentation">
                  <a
                    className={
                      currenttab === 1 ? "nav-link active" : "nav-link"
                    }
                    id="studList-tab"
                    data-toggle="tab"
                    href="#studList"
                    role="tab"
                    aria-controls="studList"
                    aria-selected="true"
                  >
                    List
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    className={
                      currenttab === 2 ? "nav-link active" : "nav-link"
                    }
                    id="chatList-tab"
                    data-toggle="tab"
                    href="#chatList"
                    role="tab"
                    aria-controls="chatList"
                    aria-selected="false"
                  >
                    Chat
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      <div className="subNameBox">
        <div className="homeLion2">
          <img src="/img/homeLion2.svg" />
        </div>
        <span>Smart Active</span>
        <div className="SubName">
          <strong>
            LEON English &gt; <br />
            L1 &gt; Session 02
          </strong>
          <b>S1</b>
        </div>
      </div>

      <div className="handLinks">
        {room && (
          <Link
            to=""
            className={isaudioon ? "linkMic" : "linkMic active"}
            onClick={(e) => AudioOnOff(isaudioon)}
          ></Link>
        )}
        <Link
          to=""
          className="linkEnd active"
          onClick={(e) => EndCall()}
          style={{ cursor: "pointer" }}
        ></Link>
        {room && (
          <>
            <Link
              to=""
              className={isvideoon ? "linkVid" : "linkVid active"}
              onClick={(e) => VideoOnOff(isvideoon)}
            ></Link>
            <a href="#" className="linkHand"></a>
          </>
        )}
      </div>
    </>
  );
};

export default Classroom;
