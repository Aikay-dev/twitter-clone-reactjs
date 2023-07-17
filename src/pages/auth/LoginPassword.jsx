import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, realTimeDatabase } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";

const LoginPassword = ({ userAuth, setUserAuth }) => {
  const navigate = useNavigate();
  let focus = useRef(null);
  const [nextLoad, setNextLoad] = useState(false);
  const handleFocusing = () => {
    focus.current.focus();
  };
  const [showEye, setShowEye] = useState(true);
  const [showCanceledEye, setShowCanceledEye] = useState(false);
  const [passwordBox, setPasswordBox] = useState("password");

  const handlePassword = (e) => {
    let currentData = userAuth;
    currentData.password = e;
    setUserAuth(currentData);
  };
  const [errorOutline, setErrorOutline] = useState({});

  const updateNodeSilent = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {
        console.log("Data updated successfully");
        navigate("/Home/");
        window.location.reload();
        setNextLoad(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        settweetingLoader(false);
      });
  };

  return (
    <div>
      <p className="login-pass-text-enter-pass text-3xl font-bold mt-8">
        Enter your password
      </p>
      <div className="login-enter-password-email-blur overflow-hidden mb-6 disabled-input-text mt-8 p-2">
        <p className="text-xs">Email</p>
        <p>{userAuth.email}</p>
      </div>
      <div className="relative login-password-input-holder">
        <input
          type={passwordBox}
          className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
          placeholder=" "
          ref={focus}
          onChange={(e) => {
            handlePassword(e.target.value);
            console.log(userAuth);
            if (userAuth.password.length < 6) {
              setErrorOutline({ borderColor: "red" });
            } else {
              setErrorOutline({});
            }
          }}
          style={errorOutline}
        />
        <label
          onClick={handleFocusing}
          htmlFor="email"
          className="absolute top-4 left-2 phemus-label2"
        >
          Password
        </label>
        {showEye && (
          <label
            onClick={() => {
              setShowEye(false);
              setShowCanceledEye(true);
              setPasswordBox("text");
            }}
            htmlFor="password"
            className="absolute right-3 bottom-2 P-5 bg-black cursor-pointer"
          >
            <FontAwesomeIcon icon="fa-regular fa-eye" />
          </label>
        )}
        {showCanceledEye && (
          <label
            onClick={() => {
              setShowEye(true);
              setShowCanceledEye(false);
              setPasswordBox("password");
            }}
            htmlFor="password"
            className="absolute right-3 bottom-2 cursor-pointer"
          >
            <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
          </label>
        )}
      </div>
      <Link className="login-password-text-forg-pass signup-link text-sm">
        Forgot password?
      </Link>
      <div
        onClick={() => {
          if (userAuth.password.length < 6) {
            setErrorOutline({ borderColor: "red" });
          } else {
            setNextLoad(true);
            signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
              .then((cred) => {
                window.location.href = "/Home";
                console.log("user logged in:", cred.user);
                /* updateNodeSilent("users/" + tweetData.tweetId, tweetData); */
              })
              .catch((err) => {
                setNextLoad(false);
                setErrorOutline({ borderColor: "red" });
                wv;
                console.log(err.message);
              });
          }
        }}
        className=" mt-32 mb-3 py-3 rounded-full flex items-center justify-center final-login-button cursor-pointer font-bold"
      >
        {!nextLoad && <p>Log in</p>}
        {nextLoad && (
          <div className="loadingio-spinner-spinner-fh0bp1jsv8o">
            <div className="ldio-zcjeuetn0iq">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <p className="p-3 login-password-text-dont-have">
        Don't have an account?{" "}
        <Link to="/auth/Signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPassword;
