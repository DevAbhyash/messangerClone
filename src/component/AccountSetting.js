import React from "react";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleAccountShow } from "../utils/AccountSetting";
import { toggleChangeProfilePicture } from "../utils/AccountSetting";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage } from "../utils/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";

const AccountSetting = () => {
  const user = useSelector((store) => store.user.userInfo);
  const fileRef = useRef();
  const isSettingShown = useSelector(
    (store) => store.accountSetting.isSettingShown
  );

  function handleHomeButtonPress() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const isShownProfilePicture = useSelector(
    (store) => store.accountSetting.toggleSetProfilePicture
  );
  const dispatch = useDispatch();

  function handleAccountSetting() {
    dispatch(toggleAccountShow());
  }

  function handleExitButtonPress() {
    dispatch(toggleAccountShow());
    console.log("Exit presses");
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.x
      })
      .catch((error) => {
        // An error happened.
      });
  }

  const handleChangeProfilePicture = () => {
    dispatch(toggleChangeProfilePicture());
  };
  const handleSaveProfilePicture = async () => {
    const storageRef = ref(storage, `${user.displayName}`);

    const uploadTask = uploadBytesResumable(
      storageRef,
      fileRef.current.files[0]
    );

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              ///

              try {
                const docRef = addDoc(collection(db, "users"), {
                  userID: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  picture: user.photoURL,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        });
      }
    );
  };

  return (
    <div className="w-full flex flex-row justify-center fixed bottom-0 bg-white flex-wrap  ">
      <img
        onClick={handleHomeButtonPress}
        className=" h-20 mx-20"
        src="https://cdn-icons-png.flaticon.com/512/162/162741.png"
      />
      <img
        className=" h-20 mx-20"
        src="https://cdn.iconscout.com/icon/free/png-256/free-search-2524763-2140475.png"
      />
      <img
        className=" h-20 mx-20"
        src="https://cdn-icons-png.flaticon.com/512/262/262038.png"
      />
      <img
        onClick={handleAccountSetting}
        className=" h-20 mx-20"
        src="https://static.thenounproject.com/png/966298-200.png"
      />
      <div
        className={`${
          !isSettingShown ? "hidden" : ""
        } flex flex-col fixed right-0 bottom-0 bg-black text-white py-20 px-30 text-xl font-bold cursor-pointer  sm:w-1/3 md:w-96 

        }`}
      >
        <p className="p-3 text-center underline"> Setting </p>{" "}
        <p
          className="p-3  hover:bg-red-500  "
          onClick={handleChangeProfilePicture}
        >
          {" "}
          Change Profile Picture{" "}
        </p>{" "}
        {isShownProfilePicture && (
          <input className="w-26" ref={fileRef} type="file" />
        )}{" "}
        {isShownProfilePicture && (
          <button
            onClick={handleSaveProfilePicture}
            className="bg-white text-black h-12 "
          >
            {" "}
            Change{" "}
          </button>
        )}{" "}
        <p className="p-3  hover:bg-red-500  " onClick={handleSignOut}>
          {" "}
          Sign Out{" "}
        </p>{" "}
        <p className="p-3  hover:bg-red-500  "> Friends </p>{" "}
        <p className="p-3  hover:bg-red-500  " onClick={handleExitButtonPress}>
          {" "}
          Exit{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default AccountSetting;
