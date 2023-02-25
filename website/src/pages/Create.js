import React, {useState, useRef} from "react"
import axios from "axios"

export default function Login() {

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
        "http://127.0.0.1:8000/login", 
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
        <h1 style={titleStyle}>
          {"Create Your Account"}
        </h1>
        <p style={descripStyle}>
          {"Griffin uses dark mode"}
        </p>
        <form style={divStyle}>

          <label>Name:</label>
          <input type="text"  ref={nameRef} name="name"/><br></br>

          <label>Email:</label>
          <input type="text"  ref={emailRef} name="email"/><br></br>
  
          <label>Password:</label>
          <input type="text" ref={passwordRef} name="password"/><br></br>
          <button onClick={fetchPaths}>Submit</button>
        </form>
      </>
    )
  }
