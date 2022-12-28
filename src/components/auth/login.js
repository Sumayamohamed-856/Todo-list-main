import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from "react-router"

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleUsernameChange = (e) => {
    setEmail(e.target.value)
  } 
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = () => {
    axios.post('https://sm-todo-list.herokuapp.com/login', {email: email, password: password})
    .then(response => {
      window.localStorage.setItem('access_token', response.data.access_token);
      navigate("/dashboard");
    })
    .catch(err => {
      console.log("error", err)
    })
  }
  


  return (
    <div className='login-app'>
      <div className="card opacity-75">
        <div className="card-body">
        <h5 className="card-title text-center mb-4 fs-2">Login</h5>
        <div className="card-text"><div className='input-types'>
           
           <input
             placeholder='Username'
             type='text'
             name='text'
             className='user-input'
             onChange={handleUsernameChange}
             />

           <input
             placeholder='password'
             type='password'
             name='password'
             className='user-input'
             onChange={handlePasswordChange}
           />

          <button className='btn btn-primary' onClick={handleSubmit}>Login</button>

          <div className='create'>
           <div className="text-dark">OR</div>
           <a href='/signup'>
             Create an account
           </a>
          </div>

       </div></div>
        </div>
        </div>
        
    </div>
  )
}

export default Login
