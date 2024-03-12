
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Blogdetails = () => {
  const [data, setData] = useState('')
  const [refresh, setrefresh] = useState(false)

  useEffect(() => {
    viewdetails();

  }, [refresh])
  const viewdetails = async () => {
    const userid = localStorage.getItem('id')
    let response = await axios.get(`http://localhost:8000/viewuserdetails/${userid}`)
    console.log("res", response.data);
    setData(response.data)
  }
  console.log('dataaa', data);



  const handledelete = async () => {
    const userid = localStorage.getItem('id')
    setrefresh(!refresh)
    let response = await axios.delete(`http://localhost:8000/deleteblog/${userid}`)
    console.log('response', response);
    if (response) {
      alert('are you sure?')

    }
  }
  return (
    <>
      {data &&
        <div>
          <h2 className='flex mt-3'><b>Your Blogs</b></h2>
          <div className='flex' style={{ gap: '40px' }}>

            {data.map((item) => (
              <div className='mt-3'>
                <Card style={{ width: '20rem', }}>
                  <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} style={{ height: '200px' }} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <div className='flex' style={{ justifyContent: 'space-evenly' }}>
                      <Link to='/update' ><button className=''
                        style={{
                          border: 'none',
                          height: '35px',
                          width: '70px',
                          backgroundColor: 'green',
                          color: 'white', borderRadius: '5px',
                          margin: '10px'
                        }}> <b>Edit</b></button></Link>
                      <button className='' onClick={handledelete} style={{
                        border: 'none', backgroundColor: 'red',
                        color: 'white', borderRadius: '5px',
                        height: '35px',
                        width: '70px',
                        margin: '10px'
                      }}> <b>Delete</b></button>

                    </div>

                  </Card.Body>
                </Card>
              </div>

            ))}
          </div>
        </div>
      }
    </>
  )
}

export default Blogdetails