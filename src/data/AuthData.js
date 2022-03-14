import axios from "../utils/axios";

const LoginUser = async (logindata) => {
  const { data } = await axios.request({
    url: "/students/login",
    method: "post",
    data: logindata,
  });
  return data;
};

export const useAuthData = () => ({ LoginUser });
