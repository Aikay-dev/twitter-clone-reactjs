import "./App.css";
import Root from "./pages/Root";
import { useState, useEffect } from "react";
import LoadingSite from "./screen/LoadingSite";
import { auth } from "./config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState } from "./store";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadBird, setLoadBird] = useState(true);
  const [authState, setAuthState] = useState(
    useSelector((state) => state.userAuth.value)
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuthState) => {
      if (userAuthState !== null) {
        console.log("New authentication state:", userAuthState.email);
        setLoadBird(false)
        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else {
        if (
          window.location.pathname === "/Home" ||
          window.location.pathname === "/Home/"
        ) {
          navigate("/Home/Explore");
          setLoadBird(false)
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      {loadBird ? <LoadingSite loadBird = {loadBird} setLoadBird ={setLoadBird}/> : <Root authState = {authState} setAuthState = {setAuthState}/>}
    </>
  );
}

export default App;

