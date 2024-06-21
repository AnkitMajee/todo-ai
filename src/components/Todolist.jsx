import React, { useState, useEffect } from 'react';
import { getDocs, doc, deleteDoc } from 'firebase/firestore'
import { database } from '../firebase-config';
import Todo from './Todo';
function Todolist({ databaseRef, setUpdate, update }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    let data = await getDocs(databaseRef);
    setLoading(false)
    setTodos(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    
  }
  useEffect(() => {
    getData()
    setUpdate(false)
  }, [update])

  const deleteItems = (id) => {
    const data = doc(database, 'todo-list', id);
    deleteDoc(data)
      .then(() => {
        getData()
      })
  }

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Add what do you want to do...</h1>
      <p>Just click the Microphone Button and say add an Item..</p>
      <Todo
        loading={loading}
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={deleteItems}
      />
    </>
  );
}

export default Todolist;