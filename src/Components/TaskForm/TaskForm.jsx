import React, { useState } from 'react';
import './TaskForm.css'; // Import CSS file
import { assets } from '../../assets/assets';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit"><img src={assets.add_icon_white} alt="Add icon" /> Add Task</button>
    </form>
  );
}

export default TaskForm;
