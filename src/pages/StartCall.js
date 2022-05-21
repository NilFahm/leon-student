import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCommon } from "../utils/useCommon";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Config } from "../data/Config";
import axios from "axios";

import VideoCall from "../components/call/VideoCall";

const StartCall = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const { sessionid } = useParams();
  const [twiliotoken, setTwilioToken] = useState(null);
  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
      await axios
        .post(
          Config.baseUrl + "/learners/get-room-token",
          { roomid: sessionid },
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          // setTwilioToken(response.data);
          console.log(response.data)
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          setAuth(null);
          navigate("/login");
        });
    }
  }, [auth]);

  return (
    <>
      {twiliotoken && (
        <VideoCall token={twiliotoken} roomname={sessionid} auth={auth} />
      )}
    </>
  );
};

export default StartCall;
