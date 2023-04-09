import { FormEvent, useEffect, useState } from "react";
import socketIo from "socket.io-client";

import { JoinRoom as JRoom, Message } from "@/types";
import JoinRoom from "@/components/JoinRoom";
import Chat from "@/components/Chat";

const joinRoom = "join_room";
const receiveMessages = "receive_messages";
const sendMessage = "send_message";

const initialFormValues: JRoom = {
  username: "",
  roomname: "javascript",
};

const initialMessageValue: Message = {
  text: "",
};

const io = socketIo("http://localhost:8000", { autoConnect: false });

const Home = () => {
  const [formValues, setFormValues] = useState<JRoom>(initialFormValues);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>(initialMessageValue);
  const [isError, setIsError] = useState(false);
  const [isConnected, setIsConnected] = useState(io.connected);

  useEffect(() => {
    const onReceiveMessage = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    io.on(receiveMessages, onReceiveMessage);
    return () => {
      io.disconnect();
    };
  }, []);

  const handleJoinRoom = (e: FormEvent) => {
    e.preventDefault();

    if (!formValues.username || !formValues.roomname) {
      return;
    }

    try {
      io.connect();
      io.emit(joinRoom, { ...formValues });
      setIsConnected(true);
    } catch (error) {
      setIsError(true);
    }

    setFormValues(initialFormValues);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    io.emit(sendMessage, message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage(initialMessageValue);
  };

  const handleExitRoom = () => {
    io.disconnect();
    setIsConnected(false);
    setMessages([]);
    setMessage(initialMessageValue);
  };

  return (
    <>
      {isConnected ? (
        <Chat
          messages={messages}
          message={message}
          onSendMessage={handleSendMessage}
          onTypeMessage={setMessage}
          onExitChat={handleExitRoom}
        />
      ) : (
        <JoinRoom
          formValues={formValues}
          onChangeFormValues={setFormValues}
          onJoinRoom={handleJoinRoom}
          isError={isError}
        />
      )}
    </>
  );
};

export default Home;
