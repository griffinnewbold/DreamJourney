import React, {useState} from 'react'
import List from '../List'
import AddButton from '../AddButton'

const divStyle = {
  textAlign: "center",
}

export default function Dashboard({data}) {
  if (data["validate"] === "true") {
  return (
    <>
      <AddButton data={data}/>
      <List elements={Object.values(data["data"])}/>
    </>
    )
  }
  return (<></>)
}