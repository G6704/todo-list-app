import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Form from '../components/Form';
import { v4 as uuidv4 } from 'uuid';
import Todo from '../components/Todo';
import Edit from '../components/Edit';

const TodoList = () => {
  const { currentUser, logout } = useAuth();
  const [todoValue, setTodo] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if the user is not authenticated
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const createTodo = todo => {
    setTodo([...todoValue, { id: uuidv4(), task: todo, isEditing: false }]);
  };

  const deleteTodo = id => {
    setTodo(todoValue.filter(todo => todo.id !== id));
  };

  const editTodo = id => {
    setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  const editTask = (task, id) => {
    setTodo(todoValue.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to the Login Page after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Todo List</h1>
        <Form createTodo={createTodo} />
        {todoValue.map((todo, idx) => (
          todo.isEditing ? (
            <Edit key={idx} editTodo={editTask} task={todo} />
          ) : (
            <Todo task={todo} key={idx} deleteTodo={deleteTodo} editTodo={editTodo} />
          )
        ))}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/profile')}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go to Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;