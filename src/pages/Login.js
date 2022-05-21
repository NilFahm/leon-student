import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Config } from "../data/Config";
import { useCommon } from "../utils/useCommon";

const Login = () => {
  const navigate = useNavigate();
  const { ShowCircularProgress, HideCircularProgress } = useCommon();
  const [auth, setAuthData] = useLocalStorage("auth", {});
  const [passwordtype, setPasswordType] = useState("password");
  const [errormessage, setErrorMessage] = useState(null);
  const [isremember, setIsRemember] = useLocalStorage("rememberme", null);
  const [isvalidate, setIsValidate] = useState(false);
  const [logindata, setLoginData] = useState({
    Email: null,
    Password: null,
  });

  useEffect(() => {
    if (isremember && isremember !== null) {
      var jso = atob(isremember)
      var parse = JSON.parse(jso)
      setLoginData({
        Email: parse.Email,
        Password: parse.Password,
      });
    }
  }, [isremember]);


  useEffect(() => {
    setTimeout(() => {
      console.log(isremember)
    }, 10000);
  }, [])

  function Remember() {
    debugger
    var data = JSON.stringify(logindata)
    var bto = btoa(data.toString())
    setIsRemember(bto)
   
  }

  async function DoLogin() {
    // setIsValidate(true);
    // if (ValidateData()) {
    ShowCircularProgress();
    await axios
      .post(Config.baseUrl + "/learners/login", logindata)
      .then((response) => {
        setAuthData(response.data);
        navigate("/schedules");
        HideCircularProgress();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        HideCircularProgress();
      });
    // }
  }

  async function ValidateData() {
    if (!logindata || !logindata.Email || !logindata.Password) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <div className="loginBox">
        <div className="loginLogo">
          <img src="/img/logo.svg" alt="" />
        </div>

        <div>
          <ul>
            {errormessage && (
              <li>
                <span className="errorTxt">{errormessage}</span>
              </li>
            )}

            <li>
              <label className="loginTxt">
                <input
                  placeholder=" "
                  autoComplete="Off"
                  value={logindata && logindata.Email}
                  onChange={(e) =>
                    setLoginData({ ...logindata, Email: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                     DoLogin()
                    }
                  }}
                  readOnly={true}
                  onFocus={(e) => (e.target.readOnly = false)}
                  type="email"
                  required={true}
                />
                <span>User Name</span>
              </label>
            </li>
            {/* {isvalidate && !logindata.Email && (
              <li>
                <span className="errorTxt">Please Enter Email</span>
              </li>
            )} */}
            <li className="Input">
              <label className="loginTxt">
                <input
                  placeholder=" "
                  type={passwordtype}
                  autoComplete="Off"
                  value={logindata && logindata.Password}
                  onChange={(e) =>
                    setLoginData({ ...logindata, Password: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                     DoLogin()
                    }
                  }}
                  readOnly={true}
                  onFocus={(e) => (e.target.readOnly = false)}
                />
                <span>Password</span>
                <Link
                  to=""
                  onClick={(e) =>
                    setPasswordType(
                      passwordtype === "text" ? "password" : "text"
                    )
                  }
                  className="eyeIcon"
                >
                  &nbsp;
                </Link>
              </label>
            </li>
            {/* {isvalidate && !logindata.Password && (
              <li>
                <span className="errorTxt">Please Enter Password</span>
              </li>
            )} */}
            <li>
              <div className="rememberBox FL">
                <label className="checkboxMain">
                  Remember me
                  <input
                    type="checkbox"
                    checked={isremember && isremember !== null}
                    onChange={(e) => {
                      e.target.checked
                        ? Remember()
                        : setIsRemember(null);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              {/* <div className="FR">
                <Link to={"/forgotpassword"} className="forgotBtn">
                  Forgot Password?
                </Link>
              </div> */}
              <div className="clear"></div>
            </li>
          </ul>
        </div>

        <div className="box-btn text-center">
          <Link to="" className="btn btn-green" onClick={(e) => DoLogin()}>
            Login
          </Link>
        </div>
      </div>

      <div className="butter1">
        <img src="/img/buterfly1.svg" alt="" />
      </div>
      <div className="butter2">
        <img src="/img/buterfly2.svg" alt="" />
      </div>
      <div className="butter3">
        <img src="/img/buterfly3.svg" alt="" />
      </div>

      <div className="clear"></div>
    </>
  );
};

export default Login;
