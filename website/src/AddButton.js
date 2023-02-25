import React, {useState, useRef} from 'react'
import axios from "axios"

const divStyle = {
    textAlign: "center",
    margin: "auto", 
    padding: "10px"
  }

export default function AddButton({data}) {

    const textRef = useRef()

    const [buttonState, setButtonState] = useState(["closed"]);

    const inputBoxStyle = {
        width: "200px",
        height: "100px"
    }

    const addStyle = {
        textAlign: "center", 
        margin: "auto", 
        padding: "10px"
    }

    function openField() {
        setButtonState(["open"])
    }

    function closeField() {
        setButtonState(["closed"])
    }

    function logElement(event) {
        var currentTime = new Date()
        setButtonState(["closed"])
        event.preventDefault()
        const text = textRef.current.value
        const email = data["email"]
    

        axios.post(
            "http://127.0.0.1:8000/add", 
            {
              "text": text, 
              "date": currentTime, 
              "email": email
            }
        ).then(response => {
            console.log(response.data)
          })
    }

    if (buttonState[0] == "closed") {
        return (
            <div style={divStyle}>
                <button onClick={openField}>Add dream</button>
            </div>
        )
    }

    if (buttonState[0] == "open") {

        return (
            <div style={addStyle}>
                <textarea style={inputBoxStyle} ref={textRef}></textarea>
                <button onClick={logElement}>Add</button>
                <button onClick={closeField}>Discard</button>
            </div>
        )
    }
}
