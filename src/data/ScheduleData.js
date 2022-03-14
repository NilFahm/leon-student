import axios from "../utils/axios";

const StudentSchedule = async (token) => {
  const { data } = await axios.request({
    url: "/students/schedule",
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: JSON.stringify({}),
  });
  return data;
};

export const useScheduleData = () => ({ StudentSchedule });
