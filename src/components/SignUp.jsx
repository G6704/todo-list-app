import React, { useState } from 'react';
import { auth } from '../firebase'; // This would be used to import auth from firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'; // This is to help in the Import of the sign-up function
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // This is the Sign-up function
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      navigate('/todo'); // Help in the Redirecting to the To-Do List after sign-up
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert(error.message); // Show error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;