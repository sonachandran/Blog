import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

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
       
      const token=response.data.token
        console.log(token);
        localStorage.setItem('token',token)
        localStorage.setItem('id',response.data.user._id)

      if (response) {
        alert('Login success')
        navigate('/createblog')
      }
    } catch (error) {
     alert("login failed")
    }
  }

  return (
    <div className='bgcolorr'>
      <div className='flex'>
        <div className='box log '>
          <label>E-mail</label>
          <input type="email" placeholder='E-mail' name='email' value={data.email} onChange={handleChange} />
          <label>Password</label>
          <input type="password" name='password' placeholder='Password' value={data.password} onChange={handleChange} />
          <button className='btn1' onClick={submitData} style={{ border: 'none', fontSize: '20px', marginTop: '30px' }}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
