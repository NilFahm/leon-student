import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

const Chat = ({ socket, sessionid }) => {
  const [auth] = useLocalStorage("auth", {});
  const [messages, setMessages] = useState([]);
  const [messagetext, setMessageText] = useState("");

  useEffect(() => {
    window.localStorage.removeItem("messages");
  }, []);

  async function SendMessage() {
    socket.emit("chat", {
      roomname: sessionid,
      username: auth.name,
      userid: auth.id,
      messagetext: messagetext,
    });
  }

  useEffect(() => {
    socket.on("message", (data) => {
      let messa = JSON.parse(window.localStorage.getItem("messages"));
      if (!messa) {
        window.localStorage.setItem("messages", JSON.stringify([]));
        messa = JSON.parse(window.localStorage.getItem("messages"));
      }
      messa.push(data);
      window.localStorage.setItem("messages", JSON.stringify(messa));
      setMessages(JSON.parse(window.localStorage.getItem("messages")));
      setMessageText("");
    });
  }, [socket]);

  return (
    <>
      <div className="chatList">
        <div className="text-center">
          <h2>Today</h2>
        </div>

        <ul className="">
          {messages &&
            messages.map((item, index) => {
              return (
                <>
                  {item.userid === auth.id ? (
                    <>
                      <li className="chatListBoxes chatListBoxes2" key={index}>
                        <img src="/img/chatIcon1.png" className="chatListImg" />
                        <div className="chatListCont">
                          <h3>
                            <strong>{item.username}</strong>
                            {/* <span>12:16PM</span> */}
                          </h3>
                          <p>{item.messagetext}</p>
                        </div>
                        <div className="clear"></div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="chatListBoxes" key={index}>
                        <img src="/img/chatIcon2.png" className="chatListImg" />
                        <div className="chatListCont">
                          <h3>
                            <strong>{item.username}</strong>
                            {/* <span>12:16PM</span> */}
                          </h3>
                          <p>{item.messagetext}</p>
                        </div>
                        <div className="clear"></div>
                      </li>
                    </>
                  )}
                </>
              );
            })}
        </ul>

        <div className="chatBoxBtn">
          <button type="button" onClick={(e) => SendMessage()}>
            <img src="/img/chatBtn.png" />
          </button>
          <textarea
            className="form-control"
            placeholder="Chat here.."
            value={messagetext}
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Chat;
