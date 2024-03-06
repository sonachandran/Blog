import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Blog1.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate()
  const [data, Setdata] = useState('')
  const changedata = (event) => {
    Setdata({ ...data, [event.target.name]: event.target.value })

  }

  const submitdata = async (event) => {
    let response = await axios.post('http://localhost:8000/insert', data)
    console.log(response);
    if(response){
      alert('registration success')
      navigate('/login')
    }
   
     
    
  
  }
  return (
    <>
  <h3 className='flex'>Register</h3>
   <div className='flex'>
    <div className='box'>
      <Form>
       
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>FirstName</Form.Label>
            <Form.Control type="text" placeholder="FirstName" onChange={changedata} name='firstname' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>LastName</Form.Label>
            <Form.Control type="text" placeholder="LirstName" onChange={changedata} name='lastname' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" onChange={changedata} name='email' />
          </Form.Group>


          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control type="password" placeholder='password' rows={3} onChange={changedata} name='password' />
          </Form.Group>  
      </Form>


      <div className='flex'>
            <button onClick={submitdata} style={{
              border: 'none', height: '40px', width: '150px',
              fontSize: '20px', backgroundColor: 'black', color: 'white', borderRadius: '10px'
            }}  >Submit </button>
          </div>
      <Link to='/login' className='flex mt-4'><div  style={{fontSize:'18px'}}>Already have an account?</div></Link>  
          </div>

       

 </div>

    </>

  )
}


export default Registration



