import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ value, url, className }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(url)} class={className}>
      {" "}
      {value}{" "}
    </button>
  );
};

export default Button;
