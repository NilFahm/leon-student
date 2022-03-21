import axios from "axios";
import { useCommon } from "./useCommon";
import { createBrowserHistory } from "history";

const url = "https://leon-api.equitec.in";
const Axios = axios.create({
  baseURL: url,
  timeout: 60000,
});

let requestCount = 0;

function ShowLoading(customMessage) {
  const { ShowCircularProgress } = useCommon();
  if (requestCount === 0) {
    ShowCircularProgress(customMessage);
  }
  requestCount++;
}

function HideLoading() {
  const { HideCircularProgress } = useCommon();
  requestCount--;
  if (requestCount === 0) {
    HideCircularProgress();
  }
}

Axios.interceptors.request.use(
  (config) => {
    if (!config.HideLoading) {
      ShowLoading();
    }
    return config;
  },
  (err) => {
    if (!err.config.HideLoading) {
      HideLoading();
    }
    // return Promise.reject(err);
    return err;
  }
);

Axios.interceptors.response.use(
  (res) => {
    if (!res.config.HideLoading) {
      HideLoading();
    }
    return res;
  },
  (err) => {
    HideLoading();
    // return Promise.response({error:err});
    return err.response;
  }
);

export default Axios;
