import {
  MouseEventHandler,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 } from "uuid";

import { Message } from "@/types";

const Chat = ({
  onExitChat,
  onSendMessage,
  onTypeMessage,
  title,
  messages,
  message,
}: {
  onExitChat: MouseEventHandler;
  onSendMessage: FormEventHandler;
  onTypeMessage: Dispatch<SetStateAction<Message>>;
  title: string;
  messages: Message[];
  message: Message;
}) => {
  return (
    <div className="p-4 p-sm-5 chat-container">
      <div className="d-flex gap-2">
        <h1>{title}</h1>
        <button className="btn btn-link" onClick={onExitChat}>
          <i className="bi-box-arrow-left text-danger fs-3"></i>
        </button>
      </div>

      <div className="my-4 p-5 bg-white rounded">
        <ul className="messages-container mb-4">
          {messages.map((message) => (
            <li
              key={v4()}
              className={
                message.type == "notification"
                  ? "notification bg-secondary"
                  : message.type == "message"
                  ? "message bg-success"
                  : "usermessage bg-primary"
              }
            >
              <span className="d-flex flex-column">
                {message.type == "message" && (
                  <span className="message-info">{message.username}</span>
                )}
                <span>{message.text}</span>
              </span>
              <span className="message-info align-self-end">
                {message.date}
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={onSendMessage} className="message-form">
          <div className="d-flex gap-2">
            <input
              className="form-control"
              type="text"
              name="message"
              value={message.text}
              onChange={(e) =>
                onTypeMessage({ ...message, text: e.target.value })
              }
              placeholder="Mensagem..."
            />
            <button className="btn btn-sm btn-primary">
              <i className="bi-send"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
