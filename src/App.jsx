import "./App.css";
import Root from "./pages/Root";
import { useState, useEffect } from "react";
import LoadingSite from "./screen/LoadingSite";
import { auth } from "./config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState, currentUserState } from "./store";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { realTimeDatabase } from "./config/firebase";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadBird, setLoadBird] = useState(true);
  const [authState, setAuthState] = useState(
    useSelector((state) => state.userAuth.value)
  );
  const [userRealTDBLoaded, setuserRealTDBLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuthState) => {
      if (userAuthState !== null) {
        console.log("New authentication state:", userAuthState.email);
        if (userRealTDBLoaded === true) {
          setLoadBird(false);
          console.log("true else");
        } else {
          console.log("false else");
          setLoadBird(true);
        }
        console.log(auth.currentUser);
        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else {
        if (
          window.location.pathname === "/Home" ||
          window.location.pathname === "/Home/"
        ) {
          navigate("/Home/Explore");
          setLoadBird(false);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, userRealTDBLoaded]);

  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {
    if (auth.currentUser !== null) {
      const realtimeData = (data) => {
        const CurrentRTDB = ref(realTimeDatabase, "users/");
        onValue(CurrentRTDB, (snapshot) => {
          data = snapshot.val();
          console.log(data);
          findEmail(data);
        });
        return data;
      };
      realtimeData();
    }
    console.log("from auh");
  }, [authState]);

  function findEmail(obj) {
    if (auth.currentUser !== null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === "email") {
            console.log(obj[key]);
            if (obj[key] === auth.currentUser.email) {
              console.log(obj);
              setcurrentUser(obj);
              setuserRealTDBLoaded(true);
              dispatch(currentUserState(obj))
            }
          } else if (typeof obj[key] === "object") {
            findEmail(obj[key]);
          }
        }
      }
    }
  }

  return (
    <>
      {loadBird ? (
        <LoadingSite loadBird={loadBird} setLoadBird={setLoadBird} />
      ) : (
        <Root
          authState={authState}
          setAuthState={setAuthState}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

export default App;
