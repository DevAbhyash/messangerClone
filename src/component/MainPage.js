import React from "react";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRoom } from "../utils/userSlice";

const RoomPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomInputRef = useRef();

  const handleCreateRoom = async () => {
    // Add a new document with a generated id.

    navigate("/room/chat");
    dispatch(addRoom(roomInputRef.current.value));
  };

  ///function for handling the signout whenever the user presses the signout button
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex justify-center bg-gray-300 h-screen ">
      <input
        ref={roomInputRef}
        className="h-20 w-96 rounded-lg p-4"
        type="text"
        placeholder="Please Enter Room Name"
      />
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 h-20 w-16 rounded-lg mx-6 p-4"
      >
        {" "}
        Join{" "}
      </button>{" "}
      <button
        onClick={handleSignout}
        className=" p-2 absolute right-0 h-16 bg-red-400 w-30 rounded-full font-bold"
      >
        ⎋Sign out{" "}
      </button>{" "}
    </div>
  );
};

export default RoomPage;
