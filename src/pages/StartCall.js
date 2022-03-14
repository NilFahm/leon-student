import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";

import VideoCall from "../components/call/VideoCall";

const StartCall = () => {
  const [auth] = useLocalStorage("auth", {});
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState(null);
  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const response = await GetRoomToken(auth.token, sessionid);
      setTwilioToken(response.authToken);
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
