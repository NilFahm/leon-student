import axios from "../utils/axios";

const GetRoomToken = async (token, roomid) => {
  const { data } = await axios.request({
    url: "/students/get-room-token",
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: { roomid: roomid },
  });
  return data;
};

export const useTwilioData = () => ({ GetRoomToken });
