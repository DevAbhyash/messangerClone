import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase-config";

const OldUSer = ({ getUser }) => {
  const [users, setUsers] = useState([]);

  const getUserData = async function () {
    const querySnapshot = await getDocs(collection(db, "users"));
    let tempArray = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tempArray.push(doc.data());
    });
    setUsers([...tempArray]);
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log(users);

  if (!users) return;
  return (
    <div className="flex  flex-row shadow-2xl ">
      <p className="p-5 font-bold text-xl animate-pulse "> All Friends: </p>{" "}
      {users.map((u) => {
        return (
          <div className="m-2">
            <img
              onClick={() => getUser(u.displayName)}
              className="h-20 rounded-full"
              src={u.picture}
            />{" "}
          </div>
        );
      })}{" "}
    </div>
  );
};

export default OldUSer;
