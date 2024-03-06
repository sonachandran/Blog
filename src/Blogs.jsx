
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
           
   {blog && 
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
   }
        </>


    );
}

export default Blogs;
