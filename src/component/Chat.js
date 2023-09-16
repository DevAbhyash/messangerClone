import React, { useEffect, useRef, useState } from "react";
import { addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { collection, query, where, getDocs } from "firebase/firestore";
import MessageCard from "./MessageCard";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const roomName = useSelector((store) => store.user.currentRoom);
  const userName = useSelector((store) => store.user.userInfo);
  const [allMessages, setAllMessages] = useState([]);

  const messageInputRef = useRef();
  const handleSendMessage = async () => {
    const docRef = await addDoc(collection(db, "messages"), {
      message: messageInputRef.current.value,
      timestamp: serverTimestamp(),
      room: roomName,
      user: userName.email,
    });
  };
  ///////////////
  const messageRef = collection(db, "messages");
  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", roomName));
    onSnapshot(queryMessage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setAllMessages(messages);
    });
    console.log(allMessages);
  }, []);

  return (
    <div className="bg-gray-100  overflow-scroll">
      {allMessages.map((m) => {
        return <MessageCard message={m.message} user={m.user} />;
      })}
      <div className="bg-gray-500 bottom-0 fixed  p-8 w-screen  ">
        <input
          ref={messageInputRef}
          className="my-3 h-16  rounded-lg w-96 px-5"
          placeholder="Enter Your Message"
        />{" "}
        <button
          onClick={handleSendMessage}
          className="h-16 bg-blue-400 w-36 rounded-lg font-bold mx-4 my-3"
        >
          {" "}
          Send Message{" "}
        </button>{" "}
        <button
          onClick={() => navigate("/room")}
          className="h-16 bg-blue-400 w-36 rounded-lg font-bold my-3 mx-32   "
        >
          Select Room
        </button>
      </div>{" "}
    </div>
  );
};

export default Chat;
