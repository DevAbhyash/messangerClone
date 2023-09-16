import React from "react";

const MessageCard = ({ message, user }) => {
  return (
    <div className="text-white p-3 b my-3 h-20 w-max overflow-auto  bg-blue-500 rounded-full mx-3 hover:h-24 hover:bg-red-300">
      {" "}
      <p className="">
        {" "}
        <span className="font-bold "> {user} </span> - {message}{" "}
      </p>{" "}
    </div>
  );
};

export default MessageCard;
