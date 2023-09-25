import Body from "./component/Body";
import { Routes, Route } from "react-router-dom";
import MainPage from "./component/MainPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Messages from "./component/Messages";

import { addUserInfo, removeUser } from "./utils/userSlice";

const App = function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid } = user;
        console.log(user);
        dispatch(addUserInfo(user));

        navigate("/mainPage");
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/");
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />} />{" "}
        <Route path="/mainPage" element={<MainPage />} />{" "}
        <Route path="/messages" element={<Messages />} />{" "}
      </Routes>{" "}
    </div>
  );
};
export default App;
