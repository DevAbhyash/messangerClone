import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase-config";

const Messages = () => {
  const [searchedUser, setSearachedUser] = useState("");
  const [displayUser, setDisplayUser] = useState({});
  const user = useSelector((store) => store.user.userInfo);

  function handleSearchChange(e) {
    setSearachedUser(e.target.value);
  }

  async function handleSearchButtonPress() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchedUser)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setDisplayUser(doc.data());
    });
  }
  if (!displayUser) return;
  if (!user) return;

  return (
    <div>
      {" "}
      <p className="font-serif font-bold text-3xl w">
        {" "}
        {user.displayName}{" "}
      </p>{" "}
      <div className="flex my-3 ">
        <input
          onChange={handleSearchChange}
          className="w-full bg-gray-200 h-16 rounded-lg p-3"
          type="search"
          placeholder="Please Search User With Display Name"
        />
        <button
          onClick={handleSearchButtonPress}
          className="bg-gray-500 h-16 w-24 rounded-lg mx-10 p-3"
        >
          {" "}
          Search{" "}
        </button>{" "}
      </div>{" "}
      <div>
        <Chat photo={displayUser.picture} name={displayUser.displayName} />{" "}
      </div>{" "}
    </div>
  );
};

export default Messages;
