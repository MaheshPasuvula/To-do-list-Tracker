import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../../Components/TaskForm/TaskForm';
import TaskList from '../../Components/TaskList/TaskList';
import './UserPage.css';

const UserPage = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCompleted, setFilterCompleted] = useState('all');

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    
    const addTask = async (title) => {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed: false
        });
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    const deleteTask = async (id) => {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
    const toggleCompleted = async (id) => {
      try {
        const updatedTasks = tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          completed: updatedTasks.find(task => task.id === id).completed
        });
      } catch (error) {
        console.error('Error toggling completion:', error);
      }
    }
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(task => {
      if (filterCompleted === 'completed') {
        return task.completed;
      } else if (filterCompleted === 'incomplete') {
        return !task.completed;
      } else {
        return true; // Show all tasks
      }
    });
  return (
    <div className="user-page-container">
    <h1>Task Tracker</h1>
    <div className="searchbox">
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>
    <div className="filter-options">
      <label>
        <input
          type="radio"
          value="all"
          checked={filterCompleted === 'all'}
          onChange={() => setFilterCompleted('all')}
        />
        All Tasks
      </label>
      <label>
        <input
          type="radio"
          value="completed"
          checked={filterCompleted === 'completed'}
          onChange={() => setFilterCompleted('completed')}
        />
        Completed Tasks
      </label>
      <label>
        <input
          type="radio"
          value="incomplete"
          checked={filterCompleted === 'incomplete'}
          onChange={() => setFilterCompleted('incomplete')}
        />
        Incomplete Tasks
      </label>
    </div>
    <div className="task-form-container">
    <TaskForm addTask={addTask} />
    </div>
    <div className="task-list-container">
    <TaskList
    tasks={filteredTasks}
      deleteTask={deleteTask}
      toggleCompleted={toggleCompleted}
    />
    </div>
    </div>
  )
}

export default UserPage