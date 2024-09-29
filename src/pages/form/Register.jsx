import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [salom, setSalom] = useState(true)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function clearForm() {
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        rePasswordRef.current.value = "";
    }

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert('Username is not valid');
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'black';
            clearForm();
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert('Email is not valid');
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'black';
            clearForm();
            return false;
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert('Password did not match');
            rePasswordRef.current.focus();
            rePasswordRef.current.style.outlineColor = 'black';
            clearForm();
            return false;
        }

        return true;
    }

    function handleClick(e) {        
        e.preventDefault();
        let isValid = validate();
        setSalom(false)

        if (!isValid) {
            return;
        }

        const user = {
            'username': usernameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        fetch('https://auth-rg69.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'User registered successfully!') {
                    navigate('/login');
                }

                if (data.message === 'Failed! Username is already in use!' || data.message === 'Failed! Email is already in use!') {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='container max-w-[600px] rounded-md p-5 border border-black flex flex-col gap-5 mx-auto mt-10'>
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={usernameRef} type="text" placeholder='Enter username...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={emailRef} type="email" placeholder='Enter email...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={passwordRef} type="password" placeholder='Enter password...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={rePasswordRef} type="password" placeholder='Enter password again...' />
                <button onClick={handleClick} className='uppercase text-2xl bg-blue-500 py-2 w-full rounded-md text-white font-bold'>Register</button>
            </div>
        </div>
    )
}

export default Register
