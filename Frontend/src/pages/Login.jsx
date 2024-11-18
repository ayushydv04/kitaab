import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Toggle between 'Sign Up' and 'Login'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint =
        currentState === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const requestData =
        currentState === 'Sign Up' ? { name, email, password } : { email, password };

      const response = await axios.post(endpoint, requestData);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currentState} successful!`);
        navigate('/'); // Redirect after successful login/signup
      } else {
        toast.error(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to home if token is present
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password?</p>
        <p
          onClick={() =>
            setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up')
          }
          className="cursor-pointer"
        >
          {currentState === 'Sign Up' ? 'Login Here' : 'Create Account'}
        </p>
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Sign Up' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default Login;
