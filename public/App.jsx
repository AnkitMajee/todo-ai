import './App.css'
import Todolist from './components/Todolist'
import alanBtn from '@alan-ai/alan-sdk-web'
import React, { useEffect, useState } from 'react'
import { database } from './firebase-config'
import { collection, addDoc } from 'firebase/firestore'

const databaseRef = collection(database, 'todo-list')

function App() {
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    alanBtn({
      key: '32ecd9d53caf4a9b50593a384f8294712e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        addDoc(databaseRef, { item: commandData.data }).then(() => {
          setUpdate(true)
        })
      },
    })
  }, [])

  return (
    <Todolist databaseRef={databaseRef} update={update} setUpdate={setUpdate} />
  )
}

export default App