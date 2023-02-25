import React, {useState} from 'react'
import List from '../List'

export default function Dashboard({data}) {

  const [elements, setElements] = useState([{'date': 'May 14 2002', 
    'description': 'I was walking in the streets of New York running some errands when all of the sudden, a huge storm started to pour.\
      I tried to get some shelter on the subway. The streets got completely flooded, and cabs were floating around in the water.', 
    'link': 'https://i.postimg.cc/pLpYrtP8/lib.png', 
    'link2': 'https://i.postimg.cc/B6dRYCN7/subway.png', 
    'link3': 'https://i.postimg.cc/BZN3vZ16/Trigo-streets-of-new-york-city-flooded-8k-9c42e379-8890-4f75-887f-04061bd8e2a6.png'}])

  if (data[0] === "true") {
  console.log(Object.values(data[1]))
  return (
    <>
      <List elements={Object.values(data[1])}/>
    </>
    )
  }
  return (<></>)
}