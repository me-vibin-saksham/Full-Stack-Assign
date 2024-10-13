import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function LoginUser(e){
    e.preventDefault();
    try{
      await axios.post('/login',{email, password})
      alert("Login Successfull!")
    }catch(e){
      alert('Login Failed!');
      console.log(e);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='text-5xl font-bold text-center mb-8'>Login</div>
      <form onSubmit={LoginUser} className='flex flex-col space-y-4 items-center'>
        <input 
          type='email' 
          placeholder='JohnDoe@gmail.com' 
          className='p-2 border border-gray-300 rounded w-64'
          value={email}
          onChange={e=> setEmail(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='********' 
          className='p-2 border border-gray-300 rounded w-64'
          value = {password}
          onChange = {e=> setPassword(e.target.value)}
        />
        <button 
          type='submit' 
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Login
        </button>
      </form>
      <div>Not a member?<Link to="/register" className='text-blue-600 underline'>Register</Link></div>
    </div>
  )
}

export default Login
