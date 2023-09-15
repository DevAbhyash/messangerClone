import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";

const Chat = () => {
  ///function for handling the signout whenever the user presses the signout button
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {" "}
      <button onClick={handleSignout} className="bg-red-50">
        {" "}
        Sign out{" "}
      </button>{" "}
    </div>
  );
};

export default Chat;
