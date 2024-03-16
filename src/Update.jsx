import axios from 'axios'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Update = () => {
  const [updatedata, setupdate] = useState('')
  const{id}=useParams()
  const changedata = (event) => {
    setupdate({ ...updatedata, [event.target.name]: event.target.value }
    )
  }
  console.log('updatedata', updatedata);
  const changeimage=(event)=>{
    setupdate({ ...updatedata, image: event.target.files[0] }); 
    
  }
  
  const handleupdate = async ()=>{
    // const userid = localStorage.getItem('id')
    let newdata=new FormData()
    newdata.append('title',updatedata.title)
    newdata.append('description',updatedata.description)
    newdata.append('image',updatedata.image)
    newdata.append('name',updatedata.name)
    let response = await axios.put(`http://localhost:8000/updateblog/${id}`,newdata)
    console.log('jjkksk', newdata);
    if (response) {
      alert('updated')
    }
  }

  return (
    <>
      <h2 className='flex mt-5'><b>Update Your Profile</b></h2>
      <div className='flex'>
        <Form>
          <Form.Group className="mb-5 mt-5" controlId="exampleForm.ControlInput1" >
            <Form.Control type="text" rows={3} placeholder='title' name='title' style={{ width: '800px' }} onChange={changedata} />
          </Form.Group>
           
          <Form.Group className="mb-5 mt-5" controlId="exampleForm.ControlInput1" >
            <Form.Control type="text" rows={3} placeholder='name' name='name' style={{ width: '800px' }} onChange={changedata} />
          </Form.Group>



          <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder='description' name='description' style={{ width: '800px' }} onChange={changedata} />
          </Form.Group>


          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Your Blog</Form.Label>
            <Form.Control type="file" name='image' onChange={changeimage} />
          </Form.Group>


        </Form>
      </div>
      <div className='flex mt-5' style={{ gap: '10px' }}>
        <button className='btnn1' onClick={handleupdate}>submit</button>


      </div>


    </>
  )
}

export default Update

