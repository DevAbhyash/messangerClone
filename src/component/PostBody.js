import React from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegComment } from "react-icons/fa";

const PostBody = () => {
  const user = useSelector((store) => store.user.userInfo);
  if (!user) return;

  return (
    <div className="flex flex-col  ">
      <div className=" bg-gray-200 h-full  ">
        <img className="rounded-full h-14" src={user.photoURL} />{" "}
        <p className="text-xl font-bold"> {user.displayName} </p>{" "}
        <img src={require("../postPhoto/pexels-pixabay-45201.jpg")} />{" "}
        <p> Wow such a beautiful cat ? ? ? </p> <div></div>{" "}
        <div>
          <span> ❤️ </span>💬<span> ✅</span>{" "}
        </div>{" "}
      </div>{" "}
      <div className=" bg-gray-200 h-full  ">
        <img className="rounded-full h-14" src={user.photoURL} />{" "}
        <p className="text-xl font-bold"> {user.displayName} </p>{" "}
        <img
          src={require("../postPhoto/photo-1529778873920-4da4926a72c2.jpeg")}
        />{" "}
        <p> Wow such a beautiful cat ? ? ? </p>{" "}
        <div>
          <span> ❤️ </span>💬<span> ✅</span>{" "}
        </div>{" "}
      </div>{" "}
      <div className=" bg-gray-200 h-full  ">
        <img className="rounded-full h-14" src={user.photoURL} />{" "}
        <p className="text-xl font-bold"> {user.displayName} </p>{" "}
        <img
          src={require("../postPhoto/photo-1611267254323-4db7b39c732c.jpeg")}
        />{" "}
        <p> Wow such a beautiful cat ? ? ? </p>{" "}
        <div>
          <span> ❤️ </span>💬<span> ✅</span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default PostBody;
