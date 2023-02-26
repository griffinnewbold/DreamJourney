import React, {useState, useRef} from "react"
import axios from "axios"
import "./Create.css"

export default function Create(props) {

    // Input references.
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
  
    function fetchPaths(event) {  
      event.preventDefault()

      const name = nameRef.current.value
      const email = emailRef.current.value
      const password = passwordRef.current.value
  
      if (email === "" || password === "") return
  
      emailRef.current.value = null
      passwordRef.current.value = null
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
      setTimeout(transferPage(), 3000);
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
        <div>
          <p className="content">
            <b>{"Welcome to DreamJourney! We are so excited for you to join our service!"}</b>
            <br></br><br></br>{"Here is how it works:"}<br></br>
            <pre>
            <br></br>{"  1. Create an Account"}<br></br>
            <br></br>{"  2. Login to Dashboard"}<br></br>
            <br></br>{"  3. Add a Dream!"}<br></br><br></br>
            </pre>
            <b>{"We use an AI that generates images in order to help you visualize your dreams!"}</b>
            <br></br><br></br>
            <b>{"All your information is stored securely in a backend database"}</b>
          </p>
        </div>
        <div>
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
          <button className = "submit"onClick={fetchPaths}>Submit</button>
        </form>
        </div>
        <h4 className="subheader_log">
          {"Already Have an Account?"}
        </h4>
        <button className = "login"onClick={transferPage}>Login</button>
        </div>
        <div className="footer_layer">
          <h1 className="footer">
            {"Created February 25th 2023 By Gabriel Trigo and Griffin Newbold as a hackathon project for Devfest 2023."}
          </h1>
          <h1 className="footer">
          {"All rights reserved."}
          </h1>
        </div>
      </>
    )

    function transferPage(){
      window.location.href = window.location.href.replace("create","")
    }
  }
