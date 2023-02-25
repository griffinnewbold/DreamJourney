import React from 'react'
import Element from './Element'


export default function List({elements}) {
  if (elements.length === 1 && elements[0]['Text'] === "defaultText") {
    return
  }
  return (
    elements.map(element => {
        return <Element element={element}/>
    })
  )
}
