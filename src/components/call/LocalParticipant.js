import React, { useState, useEffect, useRef } from "react";

const LocalParticipant = ({ participant, isaudioon, isvideoon }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackEnabled = (track) => {
      debugger;
    };

    const trackDisabled = (track) => {
      debugger;
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
    participant.on("trackEnabled", trackEnabled);
    participant.on("trackDisabled", trackDisabled);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <>
      <li>
        <div className="studListBox">
          <div className="liveIcon">
            <a href="#">
              <img src="/img/liveIcon.svg" />
            </a>
          </div>
          <a href="#" className={isaudioon ? "micLink" : "micLink active"}></a>
          {/* <a href="#" className="vidLink"></a>
          <a href="activity-matching.html" className="stuPlusLink"></a> */}
          <div className="stuImgBox1">
            {!isvideoon && (
              <>
                <div class="novidShow d-flex align-items-center justify-content-center">
                  <img src="/img/novideoImg2Inner.svg" />
                </div>
                <img src="/img/novideoImg2.png" />
              </>
            )}
            <video
              ref={videoRef}
              autoPlay={true}
              style={{ display: isvideoon ? "block" : "none" }}
            />
            <audio ref={audioRef} autoPlay={true} />
          </div>
          <div className="stuName stuName3">
            <span>{participant.identity}</span>
          </div>
        </div>
      </li>
    </>
  );
};

export default LocalParticipant;
