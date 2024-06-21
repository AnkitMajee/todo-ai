import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
export default function Todo({ todos, completeTodo, removeTodo, loading }) {
  return (
    <div>
      {!loading ? (
        <div>
          {todos.map((todo, index) => (
            <div
              className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
              key={index}
            >
              <div className="todo-item" key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.item}
              </div>
              <div className='icons'>
                <RiCloseCircleLine
                  onClick={() => removeTodo(todo.id)}
                  className='delete-icon'
                  size="45px"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Dimmer active>
          <Loader indeterminate>Loading your items..</Loader>
        </Dimmer>
      )}
    </div>
  )
}