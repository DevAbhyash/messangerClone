import Body from "./component/Body";
import { Routes, Route } from "react-router-dom";
import Chat from "./component/Chat";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        navigate("/chat");
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />} />{" "}
        <Route path="/chat" element={<Chat />} />{" "}
      </Routes>{" "}
    </div>
  );
};
export default App;
