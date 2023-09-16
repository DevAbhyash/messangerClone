import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/consts";
import { setLogin } from "../utils/authSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "../utils/validate";
import { auth } from "../utils/firebase-config";

const Login = () => {
  const [errorMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const signUp = useSelector((store) => store.auth.isSignup);

  function handleSignupButton() {
    dispatch(setLogin());
  }

  async function handleAuthButton() {
    const validatedResult = validate(
      emailInput.current.value,
      passwordInput.current.value
    );

    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        emailInput.current.value,
        passwordInput.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + errorMessage);

          // ..
        });
    }
    if (!signUp) {
      await signInWithEmailAndPassword(
        auth,
        emailInput.current.value,
        passwordInput.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + errorMessage);
        });
    }

    if (validatedResult) {
      setErrMsg(validatedResult);
    }
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
    // nameInput.current.value = "";
    // passwordInput.current.value = "";
    // emailInput.current.value = "";
  }
  return (
    <div className=" bg-gray-200 h-screen ">
      <div className="flex  flex-col  items-center justify-center ">
        <img className="w-20  py-9" src={LOGO} alt="logo/>" />
        <h1 className=" font-bold text-3xl py-2"> Please Login Now! </h1>{" "}
        {signUp && (
          <input
            ref={nameInput}
            className="my-3 h-16  rounded-lg w-1/4  px-5 "
            type="text"
            placeholder="Enter Your Full Name"
          />
        )}{" "}
        <input
          ref={emailInput}
          className="my-3 h-16  rounded-lg w-1/4 px-5  "
          type="text"
          placeholder="Enter Your Email"
        />
        <input
          ref={passwordInput}
          className="my-3 h-16 rounded-lg w-1/4 px-5  "
          type="password"
          placeholder="Enter Your Password"
        />
        <button
          onClick={handleAuthButton}
          className=" h-16 bg-blue-400 w-36 rounded-lg font-bold "
        >
          {" "}
          {!signUp ? "Login" : "Sign Up"}{" "}
        </button>{" "}
        <p className=" text-red-500  text-2xl "> {errorMsg} </p>{" "}
        <p
          onClick={handleSignupButton}
          className=" text-lg font-bold my-6 underline underline-offset-1 hover:cursor-pointer"
        >
          {" "}
          {!signUp
            ? "Are you new to messanger ? Sign up now"
            : "Go back to Login Page"}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
