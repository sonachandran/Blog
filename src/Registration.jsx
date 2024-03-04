import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Blog1.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Registration= () => {

  const navigate=useNavigate()
  const[data,Setdata]=useState('')
  const changedata=(event)=>{
       Setdata({...data,[event.target.name]:event.target.value})

  }
  const submitdata=async(event)=>{
   
    let response= await axios.post('http://localhost:8000/insert',data)
    console.log(response);
   
    
        alert('registration success')
        navigate('/login')
      
  
  }
return (
<div  className='bgcolorr'>
< div className='flex' style={{}}>
  <div className='box flex'>
      <div style={{padding:'50px'}} className='align'>
        <label>FirstName</label>
        <input type="text"placeholder='FirstName' onChange={changedata} name='firstname' /><br />
        <label>LastName</label>
        <input type="text"placeholder='LastName' onChange={changedata} name='lastname' /><br />
        <label>E-mail</label>
        <input type="email"placeholder='E-mail' onChange={changedata} name='email' /><br />
        <label>Password</label>
        <input type="password"placeholder='Password'onChange={changedata} name='password' />       
        <button onClick={submitdata} className='btn1 'style={{border:'none',fontSize:'20px'}}  >Submit </button>
        </div>
  </div>
    </div>
    </div>
  )}


export default Registration



