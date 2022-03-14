import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
import Participant from "../components/call/Participant";
import Video from "twilio-video";
import LocalParticipant from "../components/call/LocalParticipant";
import TeacherParticipant from "../components/call/TeacherParticipant";

const Classroom = () => {
  const [auth] = useLocalStorage("auth", {});
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const response = await GetRoomToken(auth.token, sessionid);
      setTwilioToken(response.authToken);
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
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
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
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
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
  }, [sessionid, twiliotoken]);

  async function EndCall() {
    setTwilioToken(null);
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
          </div>

          <div className="frameRight1 FR">
            <div className="viewTabs1">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="studList"
                  role="tabpanel"
                  aria-labelledby="studList-tab"
                >
                  <ul className="studList studList2 studList3">
                    {room ? (
                      <LocalParticipant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                        isaudioon={isaudioon}
                        isvideoon={isvideoon}
                      />
                    ) : (
                      <li>
                        <div className="studListBox position-relative d-flex align-items-center justify-content-center">
                          <img
                            src="/img/novideoImg1.png"
                            style={{
                              height: "100%",
                              width: "100%",
                              zIndex: "1",
                            }}
                          />
                          <div class="novidShow d-flex align-items-center justify-content-center">
                            <img
                              src="/img/novideoImg1Inner.svg"
                              style={{ zIndex: "2" }}
                            />
                          </div>
                        </div>
                      </li>
                    )}
                    {remoteParticipants}
                    {Array.from(Array(7 - participants.length), (e, i) => {
                      return (
                        <li>
                          <div className="studListBox position-relative d-flex align-items-center justify-content-center">
                            <img
                              src="/img/novideoImg1.png"
                              style={{
                                height: "100%",
                                width: "100%",
                                zIndex: "1",
                              }}
                            />
                            <div class="novidShow d-flex align-items-center justify-content-center">
                              <img
                                src="/img/novideoImg1Inner.svg"
                                style={{ zIndex: "2" }}
                              />
                            </div>
                            {/* <div className="liveIcon">
                          <a href="#">
                            <img src="/img/liveIcon.svg" />
                          </a>
                        </div>
                        <a href="#" className="micLink"></a>
                        <a href="#" className="vidLink"></a>
                        <a
                          href="activity-matching.html"
                          className="stuPlusLink"
                        ></a>
                        <div className="stuImgBox1">
                          <img src="/img/stuImg3.png" />
                        </div>
                        <div className="stuName stuName1">
                          <span> Joseph M</span>
                        </div> */}
                          </div>
                        </li>
                      );
                    })}
                    <div className="clear"></div>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="chatList"
                  role="tabpanel"
                  aria-labelledby="chatList-tab"
                >
                  <div className="chatList">
                    <div className="text-center">
                      <h2>Today</h2>
                    </div>

                    <ul className="">
                      <li className="chatListBoxes">
                        <img src="img/chatIcon2.png" className="chatListImg" />
                        <div className="chatListCont">
                          <h3>
                            {" "}
                            <strong>Teacher</strong> <span>12:16PM</span>
                          </h3>
                          <p>
                            Hi Kelly you have not maintaining the discipline in
                            the className
                          </p>
                        </div>
                        <div className="clear"></div>
                      </li>

                      <li className="chatListBoxes chatListBoxes2">
                        <img src="img/chatIcon1.png" className="chatListImg" />
                        <div className="chatListCont">
                          <h3>
                            {" "}
                            <strong>Teacher</strong> <span>12:16PM</span>
                          </h3>
                          <p>
                            Hi Kelly you have not maintaining the discipline in
                            the className
                          </p>
                        </div>
                        <div className="clear"></div>
                      </li>
                    </ul>

                    <div className="chatBoxBtn">
                      <button type="button">
                        <img src="img/chatBtn.png" />
                      </button>
                      <textarea className="form-control">Chat here..</textarea>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs tabsNew" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
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
                    className="nav-link"
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
