import React from 'react'
import './Element.css';

export default function Element({element}) {
  return (
    <>
        <div className="element">
            <div className="picture">
                <img src={element['Images'][0]} className="image"></img>
            </div>
            <div className="picture">
                <img src={element['Images'][1]} className="image"></img>
            </div>
            <div className="picture">
                <img src={element['Images'][2]} className="image"></img>
            </div>
            <div className="description">
                <div className="date">
                    {element['Date']}
                </div>
                <div>
                    {element['Text']}
                </div>
            </div>
        </div>
    </>
  )
}
