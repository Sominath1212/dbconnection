import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password
        }
        axios.post('http://localhost:4040/register', data)
            .then((res) => {
                if (res) {

                    if (res?.data?.code == true) {
                        toast.success(res?.data?.message);
                    } else if (res?.data?.code == false) {
                        toast.warning(res?.data?.message);
                    }

                }
            }).catch((err) => {
                toast.error(err.res?.data?.message || 'Something went wrong!');

            })

        setEmail("");
        setPassword("");
        setUsername("");

    }
    return (
        <>

            <h3>Registeration</h3>

            <form onSubmit={handleForm} className='flex'>

                <input
                    type="text"
                    placeholder='username'
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value.toLowerCase())}
                />
                <input
                    type="text"
                    placeholder='password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>Register</button>
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

export default Register