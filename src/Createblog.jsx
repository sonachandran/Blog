

import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';


function Createblog() {
  const[data,setData]=useState('')
  const fetchdata=(event)=>{
    setData({ ...data, [event.target.name]: event.target.value })
  }
  

  const handleImageChange = (event) => {
    setData({ ...data, image: event.target.files[0] }); 
  }

  const submitdata=async()=>{
    const userid=localStorage.getItem('id')
    let newdata=new FormData()
    newdata.append('title',data.title)
    newdata.append('description',data.description)
    newdata.append('image',data.image)
    newdata.append('userid',userid)
    let response=await axios.post('http://localhost:8000/insertblog',newdata)
    console.log(response);
    alert('success')
  }
 
  return (
    <>
      <h2 className='flex mt-4'>Create Your Blog</h2>
      <div className='flex'>
      <div style={{height:'500px',width:"800px"}}>
        <Form >
          <Form.Group className="mb-5 mt-5" controlId="exampleForm.ControlInput1" >
            <Form.Control type="text" rows={3} placeholder='Title' onChange={fetchdata}name='title' />
          </Form.Group>

          <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder='Description' onChange={fetchdata} name='description' />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Your Blog</Form.Label>
            <Form.Control type="file" name='image'   onChange={handleImageChange}/>
          </Form.Group>
        </Form>
        <div className='flex mt-5'>
        <button  onClick={submitdata} style={{
              border: 'none', height: '40px', width: '150px',
              fontSize: '20px', backgroundColor: 'green', color: 'white', borderRadius: '10px'
            }}   >Submit</button>
         </div>
 </div>
 </div>

    </>
  );
}

export default Createblog;

