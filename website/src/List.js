import React from 'react'
import Element from './Element'


export default function List({elements}) {
  return (
    elements.map(element => {
        return <Element element={element}/>
    })
  )
}
