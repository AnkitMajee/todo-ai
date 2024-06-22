import React, { useState, useEffect } from 'react';
import { addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { database } from '../firebase-config';

const Todolist = ({ databaseRef, update, setUpdate }) => {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [update]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(databaseRef);
      setTodoList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    setIsLoading(true);
    try {
      await addDoc(databaseRef, { item: newTodo });
      setNewTodo('');
      getData(); // Fetch updated list
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id) => {
    // Optimistically update UI
    setTodoList(prevList => prevList.filter(todo => todo.id !== id));
    
    try {
      const docRef = doc(database, 'todo-list', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Revert the UI change if delete fails
      getData();
    }
  };

  return (
    <div className="todo-main">
      <h1 className="header">To-Do List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="todo-add-btn" disabled={isLoading}>
          <FiPlus />
        </button>
      </form>
      <div className="todo-card">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          todoList.map((todo) => (
            <div key={todo.id} className="todo-list">
              <h3 className="todo-item">{todo.item}</h3>
              <FiTrash2
                className="close-icon"
                onClick={() => deleteItem(todo.id)}
              />
            </div>
          ))
        )}
      </div>
      <p className="footer">
        Type in the input field and click the blue button to add a new item manually.
      </p>
      <p className="footer">
        Click the blue button in the bottom right corner to add a new item using voice command!
      </p>
      <p className="footer">
        Click the red trash icon to remove an item from the list.
      </p>
    </div>
  );
};

export default Todolist;