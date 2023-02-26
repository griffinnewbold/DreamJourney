import React, {useState, useRef} from "react"
import axios from "axios"
import {Link} from "react-router-dom";
import LoginError from '../LoginError'
import Dashboard from './Dashboard'
import "./Login.css"

export default function Login() {
  const [stateData, setStateData] = useState(["undefined"]);

  // Input references.
  const emailRef = useRef()
  const passwordRef = useRef()

  function fetchPaths(event) {  

    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (email === "" || password === "") return

    emailRef.current.value = null
    passwordRef.current.value = null
    axios.post(
      "http://127.0.0.1:8000/login", 
      {
        email: email, 
        password: password
      }
    ).then(response => {
      setStateData([{
        "validate": String(response.data["validate"]), 
        "email": email, 
        "password": password, 
        "data": response.data["dreams"]}])
    })
  }

  const titleStyle = {
    textAlign: "center", 
    fontSize: "40px"
  }

  const divStyle = {
    textAlign: "center",
  }

  const descripStyle = {
    textAlign: "center", 
    fontSize: "18px"
  }

  if (stateData[0] === "undefined" || stateData[0]["validate"] === "false")
  return (
    <>
      <div className="main_layer">
      <h1 className = "header">
        {"DreamJourney"}
      </h1>
      </div>
      <div className="lacc_div">
      <h4 className="subheader">
          {"Login To Your Account"}
      </h4>
      <form style={divStyle}>
        <label className="label_email">Email:</label>
        <input type="text"  ref={emailRef} name="email"/><br></br>

        <label className="label_pwd">Password: </label>
        <input type="password" ref={passwordRef} name="password"/><br></br>
        <button className="submit"onClick={fetchPaths}>Submit</button>
        <LoginError validate={stateData[0]["validate"]}/>
      </form>
      </div>
      <div className="footer_layer">
          <h1 className="footer">
            {"Created February 25th 2023 By Griffin and Gabe"}
          </h1>
      </div>
      <button className="c_account"onClick={transferPage}>Create Account</button>
      <h4 className="subheader_create">
          {"Don't Have an Account?"}
      </h4>
      <Dashboard data={stateData[0]}/>
    </>
  )

  return (
    <>
      <div className="main_layer">
        <h1 className="header">
          {"DreamJourney"}
        </h1>
      </div>
      <h2 className="header2">
        {"Welcome! A Journey Through your Dreams Await!"}
      </h2>
      <p className="header2">
        {"Click Add a Drean to Expand Your Collection!"}
      </p>
      <Dashboard data={stateData[0]}/>
    </>
  )

  function transferPage(){
    window.location.href = window.location.href + "create"
  }
}
