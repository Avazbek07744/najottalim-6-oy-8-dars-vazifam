import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import App from '../../App';

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function clearForm() {
        usernameRef.current.value = "";
        passwordRef.current.value = "";
    }

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert('Username is not valid');
            usernameRef.current.focus();
            clearForm();
            return false;
        }
        return true;
    }

    function handleLogin(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        fetch('https://auth-rg69.onrender.com/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.id) {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className='container max-w-[600px] rounded-md p-5 border border-black flex flex-col gap-5 mx-auto mt-10'>
                <input
                    className='border border-blue-500 p-3 w-full rounded-md outline-none'
                    ref={usernameRef}
                    type='text'
                    placeholder='Enter username...'
                />
                <input
                    className='border border-blue-500 p-3 w-full rounded-md outline-none'
                    ref={passwordRef}
                    type='password'
                    placeholder='Enter password...'
                />
                <button
                    onClick={handleLogin}
                    className='uppercase text-2xl bg-blue-500 py-2 w-full rounded-md text-white font-bold'
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
