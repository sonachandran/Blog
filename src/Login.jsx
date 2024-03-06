import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const Login = () => {

  const navigate = useNavigate()
  const [data, setData] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }



  const submitData = async () => {
    try {
      let response = await axios.post('http://localhost:8000/login', data)
      console.log("Response:", response);
      const token = response.data.token
      console.log(token);
      localStorage.setItem('token', token)
      localStorage.setItem('id', response.data.user._id)

      if (response) {
        alert('Login success')
        navigate('/createblog')
      }
    } catch (error) {
      alert("login failed")
    }
  }

  return (

    <>
     <h2 className='flex mt-5 mb-3'>Login</h2>
     <div className='flex'>
     <div className='box2' >
      <Form>
       
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name='email' value={data.email} onChange={handleChange} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" rows={3} name='password' placeholder='Password' value={data.password} onChange={handleChange} />
          </Form.Group>
      </Form>

      <div className='flex'>
        <button onClick={submitData} style={{
          border: 'none', height: '40px', width: '150px',
          fontSize: '20px', backgroundColor: 'black', color: 'white', borderRadius: '10px'
        }}  >Login</button>
      </div>

      </div>
      </div>



    </>



  )
}

export default Login
