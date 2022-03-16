import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";
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

const Classroom = () => {
  const [auth] = useLocalStorage("auth", {});
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState("");
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);
  const [isactivity, setIsActivity] = useState(false);
  const [activityname, setActivity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagetext, setMessageText] = useState("");
  const [currenttab, setCurrentTab] = useState(1);

  const socket = io.connect("https://socket.fahm-technologies.com");
 
  useEffect(() => {
   console.log("activityname", activityname);
  }, [activityname]);

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      // const response = await GetRoomToken(auth.token, sessionid);
      // setTwilioToken(response.authToken);
      const joindata = { userid: auth.id, roomname: sessionid };
      socket.emit("joinroom", joindata);
    }
  }, [auth]);

  const remoteParticipants = participants
    .filter((x) => x.identity !== "azizi@leonclassroom.com")
    .map((participant) => (
      // <></>
      <Participant key={participant.sid} participant={participant} />
    ));

  const teacherParticipant = participants.filter(
    (x) => x.identity === "azizi@leonclassroom.com"
  );

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
      if (
        data.activity !== activityname &&
        data.activity !== "startcall" &&
        data.activity !== "endcall"
      ) {
        setActivity(data.activity);
        setIsActivity(true);
        setCurrentTab(3);
      } else if (data.activity === "endcall") {
        EndCall();
      } else {
        setActivity(null);
        setIsActivity(false);
        setCurrentTab(1);
      }
    });

    socket.on("message", (data) => {
      let messa = messages;
      messa.push(data);
      setMessages(messa);
      setMessageText("");
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

  async function SendMessage(messagedata) {
    socket.emit("chat", {
      roomname: sessionid,
      username: auth.name,
      userid: auth.id,
      messagetext: messagedata,
    });
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
                <div class="innHeader">
                  <h2>White board</h2>
                </div>
                <div class="viewImg1">
                  <div class="whiteBoardBox">
                    <iframe
                      src={
                        "https://whiteboard.fahm-technologies.com/?whiteboardid=67c215e2-f2f4-49da-9c18-2f0df7c6fe81"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
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
                        <div class="novidShow d-flex align-items-center justify-content-center">
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
                    <ul class="whiteListMain">
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
                              <div class="novidShow d-flex align-items-center justify-content-center">
                                <img src="/img/novideoImg1Inner.svg" />
                              </div>
                            </div>
                          </>
                        )}
                      </li>

                      <li>
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

                      <div class="clear"></div>
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
                    <li>
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
                    {Array.from(Array(7 - participants.length), (e, i) => {
                      return (
                        <li>
                          <ParticipantNotConnected />
                        </li>
                      );
                    })}
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
                  <Chat
                    messages={messages}
                    auth={auth}
                    SendMessage={SendMessage}
                    messagetext={messagetext}
                    setMessageText={setMessageText}
                  />
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
                  <li class="nav-item" role="presentation">
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

      <div class="subNameBox">
        <div class="homeLion2">
          <img src="/img/homeLion2.svg" />
        </div>
        <span>Smart Active</span>
        <div class="SubName">
          <strong>
            LEON English &gt; <br />
            L1 &gt; Session 02
          </strong>
          <b>S1</b>
        </div>
      </div>

      <div class="handLinks">
        <Link
          to=""
          className={isaudioon ? "linkMic" : "linkMic active"}
          onClick={(e) => AudioOnOff(isaudioon)}
        ></Link>
        <Link
          to=""
          className="linkEnd active"
          onClick={(e) => EndCall()}
          style={{ cursor: "pointer" }}
        ></Link>
        <Link
          to=""
          className={isvideoon ? "linkVid" : "linkVid active"}
          onClick={(e) => VideoOnOff(isvideoon)}
        ></Link>
        <a href="#" class="linkHand"></a>
      </div>
    </>
  );
};

export default Classroom;
