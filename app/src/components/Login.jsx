import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import login from '../assets/login.json'
import Lottie from 'lottie-react'
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    const data = {

      email: email,
      password: password
    }
    axios.post('http://localhost:4040/register', data)
      .then((res) => {
        if (res) {

          toast.success(res.data.message);
        }
      }).catch((err) => {
        toast.error(err.res?.data?.message || 'Something went wrong!');

      })

    setEmail("");
    setPassword("");


  }
  return (
    <>

      <h3>Login</h3>

      <Lottie
      
        animationData={login}
        loop={false} />

      <form onSubmit={handleForm} className='flex'>


        <input
          type="text"
          placeholder='email'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder='password'
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Login