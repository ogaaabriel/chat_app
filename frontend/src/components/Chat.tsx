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
  messages,
  message,
}: {
  onExitChat: MouseEventHandler;
  onSendMessage: FormEventHandler;
  onTypeMessage: Dispatch<SetStateAction<Message>>;
  messages: Message[];
  message: Message;
}) => {
  return (
    <div className="p-4 p-sm-5 chat-container">
      <h1>Chat</h1>
      <button className="btn btn-sm btn-danger" onClick={onExitChat}>
        Sair
      </button>

      <div className="my-4 p-5 bg-white rounded">
        <ul className="messages-container mb-2">
          {messages.map((message) => (
            <li key={v4()} className="card mb-2 px-2 py-1">
              {message.text}
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
            <button className="btn btn-sm btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
