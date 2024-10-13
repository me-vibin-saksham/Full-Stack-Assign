import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function registerUser(e){
        e.preventDefault();
        try{
        await axios.post('/register',{
            name,email,password
        });
        alert("User Registered!");
      }catch(e){
        alert("Something Failed!")
      }

    }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='text-5xl font-bold text-center mb-8'>Register</div>
      <form className='flex flex-col space-y-4 items-center' onSubmit={registerUser}>
        <input 
          type='text' 
          placeholder='John Doe' 
          className='p-2 border border-gray-300 rounded w-64'
          value={name}
          onChange={e=>setName(e.target.value)}
        />
        <input 
          type='email' 
          placeholder='JohnDoe@gmail.com' 
          className='p-2 border border-gray-300 rounded w-64'
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='********' 
          className='p-2 border border-gray-300 rounded w-64'
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button 
          type='submit' 
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Register
        </button>
      </form>
      <div>Already a member?<Link to="/login" className='text-blue-600 underline'>Login</Link></div>
    </div>
  )
}

export default Register