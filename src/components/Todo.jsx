import React, { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'
import { database } from '../firebase-config'

export default function Todo({ databaseRef, update, setUpdate }) {
  const [todoList, setTodoList] = useState([])

  const getData = async () => {
    let data = await getDocs(databaseRef)
    setTodoList(data.docs.map((item) => ({ ...item.data(), id: item.id })))
  }

  useEffect(() => {
    getData()
    setUpdate(false)
  }, [update])

  const deleteItems = async (id) => {
    const data = doc(database, 'todo-list', id)
    await deleteDoc(data)
    setUpdate(true)
  }

  return (
    <>
      <div className='todo-card'>
        {todoList.map((todo) => (
          <div key={todo.id} className='todo-list'>
            <h3 className='todo-item'>{todo.item}</h3>
            <FiTrash2
              className='close-icon'
              onClick={() => deleteItems(todo.id)}
            />
          </div>
        ))}
      </div>
      <p className='footer'>
        Click the blue button to add a new item using voice command!
      </p>
      <p className='footer'>
        Click the red button to remove an item from the list.
      </p>
    </>
  )
}