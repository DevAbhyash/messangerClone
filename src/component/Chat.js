import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatScreen } from "../utils/chat";

import { db } from "../utils/firebase-config";
import {
  addDoc,
  query,
  collection,
  serverTimestamp,
  where,
  onSnapshot,
} from "firebase/firestore";

const Chat = ({ photo, name, combinedId, receiver }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.userInfo);
  const [inputMessage, setInputMesssage] = useState("");
  const chatScreen = useSelector((store) => store.chat.isShownChatScreen);

  const [allMessage, setAllMessage] = useState([]);

  const handleUserClick = () => {
    ///function for opening chat screen
    dispatch(setChatScreen());
  };

  function handleChatCloseButton() {
    //function for closing chat screen
    dispatch(setChatScreen());
  }

  useEffect(() => {
    //useEffect for fetching all the message of the users

    const q = query(
      collection(db, "chats"),
      where("combinedId", "==", combinedId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data() });
      });

      setAllMessage(temp);
    });

    return () => {
      unsubscribe();
    };
  }, [combinedId]);

  async function handleSendMessage() {
    ///funciton for adding messages in the database named chats using combined ie
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        sender: currentUser.uid,
        combinedId: combinedId,
        receiver: receiver,
        message: inputMessage,
        timeStamp: serverTimestamp(),
        displayName: currentUser.displayName,
        photo: currentUser.photoURL,
        userId: currentUser.uid,
      });
    } catch (e) {}
  }

  return (
    <div className="shadow-lg  ">
      <img
        onClick={handleUserClick}
        className="h-28 rounded-full"
        src={photo}
      />{" "}
      <p className="font-bold font-serif "> {name} </p>{" "}
      {chatScreen ? (
        <div className="bg-gray-200 flex justify-center h-screen   ">
          <img className="h-28 rounded-full" src={currentUser.photoURL} />{" "}
          <span className="text-3xl font-bold"> AND </span>{" "}
          <img className="h-28 rounded-full" src={photo} />{" "}
          <button
            onClick={handleChatCloseButton}
            className="absolute right-5 bg-red-500 h-16 w-16 rounded-full "
          >
            Close Chat{" "}
          </button>{" "}
          <div className="bg-chatTheme bg-cover bg-center  absolute left-7 my-10 border-4 border-green-900 py-10 px-5 w-full mt-32 h-5/6 overflow-scroll flex flex-col  justify-start">
            {" "}
            {allMessage.map((m) => {
              return (
                <p
                  className={
                    m.userId === currentUser.uid
                      ? "text-white bg-blue-500 my-4 mx-6   p-5 rounded-3xl   ml-auto w-auto "
                      : "text-white bg-red-500 my-4  p-5 rounded-3xl w-1/3 "
                  }
                >
                  <span>
                    <img className="h-14 rounded-full" src={m.photo} />{" "}
                  </span>{" "}
                  {m.message}{" "}
                </p>
              );
            })}{" "}
          </div>{" "}
          <div className="fixed bottom-0 bg-gray-500 w-full  text-white  ">
            <input
              onChange={(e) => setInputMesssage(e.target.value)}
              className=" w-1/2 h-16 p-10 mx-4 text-black rounded-3xl"
              type="text"
              placeholder="Please Enter Text"
            />
            <button
              onClick={handleSendMessage}
              className="h-16 w-24 text-black  mx-10 rounded-3xl bg-white p-4"
            >
              Send Messsage{" "}
            </button>{" "}
          </div>{" "}
        </div>
      ) : (
        ""
      )}{" "}
    </div>
  );
};

export default Chat;
