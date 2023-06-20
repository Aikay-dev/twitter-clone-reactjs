import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { auth } from '../config/firebase';
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState } from '../store';
import { useNavigate } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const LoadingSite = ({loadBird, setLoadBird}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState(
    useSelector((state) => state.userAuth.value)
  );
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuthState) => {
      if (userAuthState !== null) {

        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else {
        setLoadBird(false)
        console.log("hey")
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
    <div className='main-tweeter-loading h-screen w-screen bg-black text-5xl flex items-center justify-center'>
        <FontAwesomeIcon icon="fab fa-twitter" />
    </div>
  )
}

export default LoadingSite