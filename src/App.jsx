import React, { useEffect, useState } from 'react';
import './App.css';
import Todolist from './components/Todolist';
import alanBtn from "@alan-ai/alan-sdk-web";
import { app, database } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const databaseRef = collection(database, 'todo-list');
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    alanBtn({
      key: 'My API key/stage',
      onCommand: (commandData) => {
        addDoc(databaseRef, { item: commandData.data })
        .then(() => {
          setUpdate(true);
        })
      }
    });
  }, []);

  return (
    <div className='todo-app'>
      <Todolist databaseRef={databaseRef} setUpdate={setUpdate} update={update}/>
    </div>
  )
}

export default App
