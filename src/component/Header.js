import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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
    <div className="shadow-lg w-full">
      <p className="font-serif text-3xl ">
        {" "}
        Instragram <span className="absolute right-20"> ❤️ </span>{" "}
        <span
          className="absolute right-0 "
          onClick={() => navigate("/messages")}
        >
          {" "}
          💬{" "}
        </span>{" "}
      </p>{" "}
      <div className="flex p-3 shadow-lg ">
        {" "}
        {users.map((user) => {
          return (
            <img
              className="bg-white h-20 w-20 rounded-full m-3 "
              src={user.picture}
            />
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default Header;
