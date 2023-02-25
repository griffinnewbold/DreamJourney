import React, {useState, useRef} from "react"
import axios from "axios"
import "./Create.css"

export default function Create(props) {

    // Input references.
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

  
    function fetchPaths() {  
      
      const name = nameRef.current.value
      const email = emailRef.current.value
      const password = passwordRef.current.value
  
      if (email === "" || password === "") return
  
      emailRef.current.value = null
      passwordRef.current.value = null
      console.log("hoeeeee")
      axios.post(
        "http://127.0.0.1:8000/create", 
        {
          name: name,
          email: email, 
          password: password
        }
      ).then(response => {
        console.log(response.data)
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
  
    return (
      <>
        <div className="main_layer">
        <h1 className="header">
          {"DreamJourney"}
        </h1>
        </div>
        <div className="image">
        <img src= "dreamjourney_logo.png" alt="DreamJourney Logo"/>
        </div>
        <div className="acc_div">
        <h4 className="subheader">
          {"Create Your Account"}
        </h4>
        <form style={divStyle}>

          <label className="label_email">Name:</label>
          <input type="text"  ref={nameRef} name="name"/><br></br>

          <label className="label_email">Email:</label>
          <input type="text"  ref={emailRef} name="email"/><br></br>
  
          <label className="label_pwd">Password: </label>
          <input type="text" ref={passwordRef} name="password"/><br></br>
          <button onClick={fetchPaths}>Submit</button>
        </form>
        </div>
        <button className = "login"onClick={transferPage}>Return to Login</button>
      </>
    )

    function transferPage(){
      window.location.href = window.location.href.replace("create","")
    }
  }
