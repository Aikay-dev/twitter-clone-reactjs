import "./App.css";
import Root from "./pages/Root";
import { useState, useEffect } from "react";
import LoadingSite from "./screen/LoadingSite";
import { auth } from "./config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState, currentUserState } from "./store";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
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
        if (userRealTDBLoaded === true) {
          setLoadBird(false);
        } else {
          setLoadBird(true);
        }

        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else {
        if (
          window.location.pathname !== "/Home/Explore" ||
          window.location.pathname !== "/Home/Explore/"
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

          findEmail(data);
        });
        return data;
      };
      realtimeData();
    }
  }, [authState]);

  function findEmail(obj) {
    if (auth.currentUser !== null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === "email") {
            if (obj[key] === auth.currentUser.email) {
              setcurrentUser(obj);
              setuserRealTDBLoaded(true);
              dispatch(currentUserState(obj));
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
