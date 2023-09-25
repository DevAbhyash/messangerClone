import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountSetting from "./AccountSetting";

import Header from "./Header";
import PostBody from "./PostBody";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userInfo);

  return (
    <div className="flex overflow-x-scroll    ">
      <Header />
      <div className="flex flex-col absolute top-40  p-10 ">
        <PostBody />
      </div>{" "}
      <AccountSetting />
    </div>
  );
};

export default MainPage;
