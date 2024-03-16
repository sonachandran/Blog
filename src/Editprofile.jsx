import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Editprofile = () => {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const fetchdata = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitdata = async () => {
        try {
            const id = localStorage.getItem('id');
            const response = await axios.put(`http://localhost:8000/updateprofile/${id}`, data);
            console.log('res', response.data); // Assuming response contains updated data
            setData(response.data); // Update state with the response data if needed
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error as needed
        }
    };

    console.log('data', data);

    return (
        <>
            <h2 className='flex mt-5'><b>Edit Your Profile </b></h2>
            <div className='flex mt-4'>
                <div style={{ height: '500px', width: '800px' }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="text" name='firstname' value={data.firstname} onChange={fetchdata} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" name='lastname' value={data.lastname} onChange={fetchdata} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' value={data.email} onChange={fetchdata} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" name='password' value={data.password} onChange={fetchdata} />
                        </Form.Group>
                    </Form>
                    <div className='flex'>
                        <button style={{
                            border: 'none', height: '40px', width: '150px',
                            fontSize: '20px', backgroundColor: 'green', color: 'white', borderRadius: '10px'
                        }} onClick={submitdata} >Submit </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editprofile;
