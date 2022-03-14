import ReactDOM from "react-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "reactstrap";
import axios from "axios";

const ShowCircularProgress = (customMessage) => {
  const dom = document.createElement("div");
  dom.setAttribute("id", "loading");
  document.body.appendChild(dom);
  ReactDOM.render(
    <Snackbar
      color="dark"
      open={true}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      keyboard={"false"}
      style={{ height: "100%", width: "100%" }}
    >
      <Alert
        className="text-center"
        color="dark"
        style={{
          color: "#546122",
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
      >
        {/* <CircularProgress
          style={{ color: "#546122", backgroundColor: "#fef6ec" }}
        ></CircularProgress> */}
        {/* <img src="/assests/images/loading.svg"/> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: "auto", background: "none" }}
          width="150"
          height="150"
          display="block"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 100 100"
        >
          <circle cx="84" cy="50" r="10" fill="#4e5b28">
            <animate
              attributeName="r"
              begin="0s"
              calcMode="spline"
              dur="0.8928571428571428s"
              keySplines="0 0.5 0.5 1"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="10;0"
            ></animate>
            <animate
              attributeName="fill"
              begin="0s"
              calcMode="discrete"
              dur="3.571428571428571s"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="#4e5b28;#abbd81;#f8b26a;#e88f48;#4e5b28"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#4e5b28">
            <animate
              attributeName="r"
              begin="0s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="0;0;10;10;10"
            ></animate>
            <animate
              attributeName="cx"
              begin="0s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="16;16;16;50;84"
            ></animate>
          </circle>
          <circle cx="50" cy="50" r="10" fill="#e88f48">
            <animate
              attributeName="r"
              begin="-0.8928571428571428s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="0;0;10;10;10"
            ></animate>
            <animate
              attributeName="cx"
              begin="-0.8928571428571428s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="16;16;16;50;84"
            ></animate>
          </circle>
          <circle cx="84" cy="50" r="10" fill="#f8b26a">
            <animate
              attributeName="r"
              begin="-1.7857142857142856s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="0;0;10;10;10"
            ></animate>
            <animate
              attributeName="cx"
              begin="-1.7857142857142856s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="16;16;16;50;84"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#abbd81">
            <animate
              attributeName="r"
              begin="-2.6785714285714284s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="0;0;10;10;10"
            ></animate>
            <animate
              attributeName="cx"
              begin="-2.6785714285714284s"
              calcMode="spline"
              dur="3.571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
              values="16;16;16;50;84"
            ></animate>
          </circle>
        </svg>
        {/* <br />
        {customMessage ? customMessage : "Please Wait...!!"} */}
      </Alert>
    </Snackbar>,
    dom
  );
};

const HideCircularProgress = () => {
  document.body.removeChild(document.getElementById("loading"));
};

async function TranslateMessage(lang, query) {
  const response = await axios.get(
    "https://translation.googleapis.com/language/translate/v2?target=" +
      lang +
      "&key=AIzaSyCR1-T5xrEC64HgilGa2Y0J4b2LniopkMs&q=" +
      query
  );
  return response.data.data.translations[0].translatedText;
}

export const useCommon = () => ({
  ShowCircularProgress,
  HideCircularProgress,
  TranslateMessage,
});
