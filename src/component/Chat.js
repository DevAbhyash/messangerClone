import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatScreen } from "../utils/chat";

const Chat = ({ photo, name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.userInfo);
  const chatScreen = useSelector((store) => store.chat.isShownChatScreen);

  const handleUserClick = () => {
    dispatch(setChatScreen());
  };
  function handleChatCloseButton() {
    dispatch(setChatScreen());
  }
  return (
    <div className="shadow-lg ">
      <img
        onClick={handleUserClick}
        className="h-28 rounded-full"
        src={photo}
      />{" "}
      <p className="font-bold font-serif "> {name} </p>{" "}
      {chatScreen ? (
        <div className="bg-gray-500 flex justify-center ">
          <img className="h-28 rounded-full" src={currentUser.photoURL} />{" "}
          <span className="text-3xl font-bold"> AND </span>{" "}
          <img className="h-28 rounded-full" src={photo} />{" "}
          <button
            onClick={handleChatCloseButton}
            className="absolute right-5 bg-red-500 h-16 w-16 rounded-full"
          >
            Close Chat
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chat;
