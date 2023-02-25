import React from 'react'
import './Element.css';

export default function Element({element}) {
  return (
    <>
        <div className="element">
            <div className="picture">
                <img src={element['link']} className="image"></img>
            </div>
            <div className="picture">
                <img src={element['link2']} className="image"></img>
            </div>
            <div className="picture">
                <img src={element['link3']} className="image"></img>
            </div>
            <div className="description">
                <div className="date">
                    {element['date']}
                </div>
                <div>
                    {element['description']}
                </div>
            </div>
        </div>
    </>
  )
}
