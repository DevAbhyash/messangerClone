import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase-config";

const PostBody = () => {
  const currentUser = useSelector((store) => store.user.userInfo);
  const [post, setPost] = useState("");
  const [allPosts, setAllPost] = useState([]);

  function handleChange(e) {
    setPost(e.target.value);
  }

  async function handlePostButton() {
    const auth = getAuth();
    const user = auth.currentUser;
    // Add a new document in collection "cities"
    await addDoc(collection(db, "posts"), {
      name: user.displayName,
      photo: user.photoURL,
      post: post,
    });
  }

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let temp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      temp.push({ ...doc.data() });
    });
    setAllPost(temp);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  if (!allPosts) return;
  return (
    <div className="flex flex-col  ">
      <div className="w-screen">
        <input
          onChange={handleChange}
          className="h-20  bg-gray-300 rounded-lg text-black w-5/6"
          placeholder="Post your story Dear...?"
        />
        <button
          onClick={handlePostButton}
          className="p-4 bg-blue-500 mx-2 h-20 w-20 rounded-full"
        >
          {" "}
          Post{" "}
        </button>{" "}
      </div>{" "}
      <div className="h-screen">
        {" "}
        {allPosts.map((p) => {
          return (
            <div className=" text-left w-4/5 bg-black  mt-20 h-1/2 p-4  ">
              <img className="h-20 rounded-full w-20  " src={p.photo} />{" "}
              <p className="text-white p-2 font-bold font-serif"> {p.name} </p>{" "}
              <p className="p-6    m-20    rounded-lg text-white font-bold text-5xl ">
                {" "}
                {p.post}{" "}
              </p>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default PostBody;
