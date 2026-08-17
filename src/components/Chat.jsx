import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const socketRef = useRef(null);
  const { targetUserId } = useParams();
  const loggedInUser = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const chatHistory = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      if (!chatHistory) {
        console.log("NO Chat History");
      } else {
        console.log(chatHistory.data.messages);
        const messageHistory = chatHistory?.data?.messages;
        const chatmsgs = messageHistory.map((msg) => {
          return {
            sender_Id: msg.senderId._id,
            senderName: `${msg.senderId.firstName} ${msg.senderId.lastName}`,
            photo: msg.senderId.photoUrl,
            text: msg.text,
            timestamp: msg.createdAt,
          };
        });
        console.log("chatmsgs", chatmsgs);
        setMessages(chatmsgs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!loggedInUser?._id) return;
    socketRef.current = createSocketConnection();
    const socket = socketRef.current;

    console.log("CLIENT SOCKET:", socket.id);
    console.log("CLIENT CONNECTED:", socket.connected);

    socket.emit("joinchat", { userId: loggedInUser._id, targetUserId });

    socket.on(
      "messageReceived",
      ({ senderName, sender_Id, userId, text, photo, timestamp }) => {
        console.log(
          "🔥 messageReceived ->",
          senderName,
          sender_Id,
          userId,
          text,
        );
        console.log("Logged in user", loggedInUser);
        setMessages((messages) => [
          ...messages,
          { senderName, sender_Id, userId, text, photo, timestamp },
        ]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser?._id, targetUserId]);

  const sendMessage = () => {
    console.log("Client->", newMessage);
    const socket = socketRef.current;
    socket.emit("sendMessage", {
      senderFirstName: loggedInUser.firstName,
      senderLastName: loggedInUser.lastName,
      userId: loggedInUser._id,
      targetUserId,
      text: newMessage,
      photo: loggedInUser.photoUrl,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col bg-base-300">
      <h1 className="border-b bg-amber-200">Chat</h1>
      <div
        ref={chatContainerRef}
        className="border bg-base-200 overflow-y-auto h-90 w-3xl p-1.5"
      >
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (message.sender_Id === loggedInUser._id
                  ? "chat-end"
                  : "chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={`photo_${message.senderName}`}
                    src={message?.photo}
                  />
                </div>
              </div>
              <div className="chat-header">
                {message?.senderName}
                <time className="text-xs opacity-50">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div className="chat-bubble">{message?.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="border flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          className="border bg-base-200 rounded-md w-full p-1"
        />
        <button
          className="btn btn-outline btn-success btn-sm m-1"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
