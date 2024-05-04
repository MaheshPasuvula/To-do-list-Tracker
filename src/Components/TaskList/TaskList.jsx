import React from 'react'
import './TaskList.css'

const TaskList = ({ tasks, deleteTask, toggleCompleted }) => {
  return (
    <ul className="task-list">
    {tasks.map(task => (
      <li key={task.id} className={task.completed ? 'completed' : ''}>
        <span>{task.title}</span>
        <div>
          <button onClick={() => toggleCompleted(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);
  
}

export default TaskList