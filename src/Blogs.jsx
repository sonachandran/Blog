
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Blogs() {
    const [blog, setblog] = useState('')
    useEffect(() => {
        setblogs()
    },[])
    const setblogs = async () => {
        let response = await axios.get('http://localhost:8000/find')
        console.log(response.data);
        setblog(response.data)
    }

    return (

        <>
           
   {/* {blog && 
   <div className='flex mt-5 gap-5 '>
    {blog.map((item)=>(
        <div className='mt-5'>
            <Card style={{ width: '22rem', height:'24rem'}}>
                <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>

                </Card.Body>
            </Card>

        </div>

    ))}
   
   </div>
   } */}



   
{blog &&
       <div>
       <h3 className='flex mt-4'><b>BLOGS</b></h3>
        <div className='flex ' style={{gap:'40px',margin:'30px' }}>
       
          {blog.map((item) => (
          <div className='mt-3'>
            <Card style={{ width: '20rem', }}>
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
                
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
