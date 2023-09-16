import Body from "./component/Body";
import { Routes, Route } from "react-router-dom";
import RoomPage from "./component/MainPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Chat from "./component/Chat";

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

        dispatch(addUserInfo(user));
        navigate("/room");
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
        <Route path="/room" element={<RoomPage />} />{" "}
        <Route path="/room/chat" element={<Chat />} />{" "}
      </Routes>{" "}
    </div>
  );
};
export default App;
