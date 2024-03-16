import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { IoPersonCircleOutline } from "react-icons/io5";


const Profile = () => {
    const navigate = useNavigate()
    const [profile, SetProfile] = useState('')
    const userid = localStorage.getItem('id')
    useEffect(() => {
        setprofile()
    }, [])
    const setprofile = async () => {
        console.log('userid', userid);
        let response = await axios.get(`http://localhost:8000/viewprofile/${userid}`)
        SetProfile(response.data)
    }

    console.log('data', profile);

    const viewblog = () => {
        navigate('/blogdetails')

    }

    return (
        <>
            <h2 className='flex mt-5'><b>Your Profile Details</b></h2>
            <div className='flex mt-4'>
                    <div style={{height:'500px',width:'800px'}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control type="text" placeholder={profile.firstname} name='firstname' />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" placeholder={profile.lastname} name='lastname' />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder={profile.email} name='email' />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" placeholder={profile.password} rows={3} name='password' />
                            </Form.Group>
                        </Form>
                        <div className='flex'style={{justifyContent:'space-evenly'}}>
                        <button onClick={viewblog} style={{
                            marginTop: '10px',
                            border: 'none',
                            height: '40px',
                            width: '180px',
                            fontSize: '18px',
                            backgroundColor:'green', color: 'white', borderRadius: '10px'
                        }}><b>Your Blog Details</b></button>

                  <Link to='/createblog'> <button style={{
                            marginTop: '10px',
                            border: 'none',
                            height: '40px',
                            width: '180px',
                            fontSize: '18px',
                            backgroundColor:'green', color: 'white', borderRadius: '10px'
                        }}><b>Create Your Blog</b></button></Link>


                       <Link to='/editprofile'><button style={{
                            marginTop: '10px',
                            border: 'none',
                            height: '40px',
                            width: '180px',
                            fontSize: '18px',
                            backgroundColor:'green', color: 'white', borderRadius: '10px'
                        }}><b>Edit your Profile</b></button> </Link> 
                    </div>
                    </div>
                   </div>
                 
                   
           
            
  


        </>
    )
}

export default Profile