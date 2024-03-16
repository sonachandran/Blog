
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Blogs() {
    const [blog, setblog] = useState('')
    const token=localStorage.getItem('token')
    useEffect(() => {
     
        setblogs()
    },[])
    const setblogs = async () => {
        let response = await axios.get('http://localhost:8000/find',{headers: {
          Authorization: `Bearer ${token}` 
       }})
        console.log(response.data);
        setblog(response.data)
    }

    return (

        <>   
{blog &&
       <div>
       <h3 className='flex mt-4'><b>BLOGS</b></h3>
        <div className='flex ' style={{gap:'40px',margin:'30px' }}>
       
          {blog.map((item) => (
          <div className='mt-3'>
           <Card style={{ width: '20rem',height:'22rem'  }}>
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title className='flex'>{item.title}</Card.Title>
                <Link to={`/detail/${item._id}`} className='flex' >Read More</Link>
               {/* <Card.Text>
                  {item.description}
                </Card.Text> */}
                
              </Card.Body>
            </Card> 
            </div>

          ))}
        </div>
        </div>
      
      }
    
      
        </>


    );
}

export default Blogs;
