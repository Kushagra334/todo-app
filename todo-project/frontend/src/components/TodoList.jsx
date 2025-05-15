import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import EditTaskModal from './EditTaskModal';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending'
};

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [animateTaskId, setAnimateTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(API_BASE_URL, {
        title: newTask,
        completed: false
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setAnimateTaskId(response.data.id);
      setTimeout(() => setAnimateTaskId(null), 500);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(t => t.id === updatedTask.id ? response.data : t));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === FILTER_OPTIONS.COMPLETED) return task.completed;
    if (filter === FILTER_OPTIONS.PENDING) return !task.completed;
    return true;
  });

  const getFilterButtonClass = (buttonFilter) => {
    return `px-4 py-2 rounded-lg font-medium ${
      filter === buttonFilter
        ? 'bg-blue-500 text-white'
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`;
  };

  const getTaskItemClass = (taskId) => {
    return `flex items-center justify-between p-4 bg-white rounded-lg shadow transition-all duration-300 ${
      animateTaskId === taskId ? 'animate-slide-in' : ''
    }`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
      
      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter(FILTER_OPTIONS.ALL)}
          className={getFilterButtonClass(FILTER_OPTIONS.ALL)}
        >
          All
        </button>
        <button
          onClick={() => setFilter(FILTER_OPTIONS.COMPLETED)}
          className={getFilterButtonClass(FILTER_OPTIONS.COMPLETED)}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter(FILTER_OPTIONS.PENDING)}
          className={getFilterButtonClass(FILTER_OPTIONS.PENDING)}
        >
          Pending
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={getTaskItemClass(task.id)}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task)}
                className={`w-6 h-6 ${
                  task.completed ? 'text-green-500' : 'text-gray-400'
                } hover:text-green-600 transition-colors duration-200`}
              >
                <CheckCircleIcon className="w-6 h-6" />
              </button>
              <span
                className={`${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                } transition-all duration-200`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingTask(task)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 transition-colors duration-200"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No {filter !== FILTER_OPTIONS.ALL ? filter : ''} tasks found
          </div>
        )}
      </div>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleEditTask}
      />
    </div>
  );
} 