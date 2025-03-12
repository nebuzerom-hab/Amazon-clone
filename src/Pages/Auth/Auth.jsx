import React, { useState } from "react";
import Layout from "../Layout/Layout";
import classes from "./SignIn.module.css";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../Utility/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import {DataContent, DataProvider,
} from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContent);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  
  const navigate=useNavigate()
  const navState=useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    //  /console.log(e.target.name);
    if (e.target.name == "signIn") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navState?.state?.redirect || "/")
        })

        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
             navigate(navState?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/640px-Amazon.com-Logo.svg.png" />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navState?.state?.msg &&(
 
<small 
 style={{
  padding:"5px",
  textAlign:"center",
  color:"red",
  fontWeight:"bold?"
 }}
 
 >
  {navState?.state?.msg}
</small>

        ) }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            onClick={authHandler}
            type="submit"
            name="signIn"
            className={classes.signin_btn}
          >
            {loading.signIn ? (
              <ClipLoader size={15} color="#000" speedMultiplier={1} />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button
          onClick={authHandler}
          type="submit"
          name="signUp"
          className={classes.register_btn}
        >
          {loading.signUp ? (
            <ClipLoader size={15} color="#000" speedMultiplier={1} />
          ) : (
            "  Create Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
