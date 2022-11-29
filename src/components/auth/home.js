import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import Pages from '../pages'
import TodoList from '../TodoList'

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const access_token = window.localStorage.getItem('access_token');
    if(!access_token) {
      navigate('/')
    }
  })

  return (
    <div className="my-bg">
        <Pages />
        <div className='container-fluid vh-100 py-5'>
         <TodoList />
        </div>
       
    </div>
  )
}

export default Home