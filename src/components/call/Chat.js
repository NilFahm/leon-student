import React from "react";

const Chat = ({ messages, auth, SendMessage, messagetext, setMessageText }) => {
  async function HandleSendMessage() {
    let message = messagetext;
    SendMessage(message);
  }
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
          <button type="button" onClick={(e) => HandleSendMessage()}>
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
