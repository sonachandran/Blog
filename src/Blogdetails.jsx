
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Card } from 'react-bootstrap'
// import { Link, useParams } from 'react-router-dom'
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";


// const Blogdetails = () => {
//   const [data, setData] = useState('')
//   const [refresh, setrefresh] = useState(false)
  

//   useEffect(() => {
//     viewdetails();

//   }, [refresh])
//   const viewdetails = async () => {
//     const userid = localStorage.getItem('id')
//     let response = await axios.get(`http://localhost:8000/viewuserdetails/${userid}`)
//     console.log("res", response.data);
//     setData(response.data)
//   }
//   console.log('dataaa', data);



//   const handledelete = async (id) => {
//     // const userid = localStorage.getItem('id')
//     setrefresh(!refresh)
//     let response = await axios.delete(`http://localhost:8000/deleteblog/${id}`)
//     console.log('response', response);
//     if (response) {
//       alert('are you sure?')
//     }
//   }
//   return (
//     <>
//       {data &&
//         <div>
//           <h2 className='flex mt-3'><b>Your Blogs</b></h2>
//           <div className='flex' style={{ gap: '40px' }}>

//             {data.map((item) => (
//               <div className='mt-3'>
//                <Card style={{ width: '20rem',height:'21rem' }}>
//                   <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} style={{ height: '200px' }} />
//                   <Card.Body>
//                     <Card.Title className='flex'>{item.title}</Card.Title>
             
//                     <div className=' mt-3' style={{float:'right' }}>
//                       <Link to={`/update/${item._id}`} className='text' ><b style={{fontSize:'25px',color:'red'}}><FaEdit/></b> </Link>
//                       <b style={{fontSize:'25px',color:'red'}}   onClick={()=>handledelete(item._id)}> <MdDelete/></b>

//                     </div>
//                    <div><Link to={`/detail/${item._id}`} style={{fontSize:'16px'}}>ReadMore</Link></div> 

//                   </Card.Body>
                  
//                 </Card>
//               </div>

//             ))}
//           </div>
//         </div>
//       }
//     </>
//   )
// }

// export default Blogdetails



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Blogdetails = () => {
  const [data, setData] = useState('');
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      viewDetails();
    }
  }, [token, refresh, navigate]);

  const viewDetails = async () => {
    const userid = localStorage.getItem('id');
    let response = await axios.get(`http://localhost:8000/viewuserdetails/${userid}`);
    console.log("res", response.data);
    setData(response.data);
  };

  const handleDelete = async (id) => {
    setRefresh(!refresh);
    let response = await axios.delete(`http://localhost:8000/deleteblog/${id}`);
    console.log('response', response);
    if (response) {
      alert('Are you sure?');
    }
  };

  return (
    <>
      {data && (
        <div>
          <h2 className='flex mt-3'><b>Your Blogs</b></h2>
          <div className='flex' style={{ gap: '40px' }}>
            {data.map((item) => (
              <div className='mt-3'>
                <Card style={{ width: '20rem', height: '21rem' }}>
                  <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.image}`} style={{ height: '200px' }} />
                  <Card.Body>
                    <Card.Title className='flex'>{item.title}</Card.Title>
                    <div className=' mt-3' style={{float:'right' }}>
                      <Link to={`/update/${item._id}`} className='text' ><b style={{fontSize:'25px',color:'red'}}><FaEdit/></b> </Link>
                      <b style={{fontSize:'25px',color:'red'}}   onClick={()=>handleDelete(item._id)}> <MdDelete/></b>
                    </div>
                    <div><Link to={`/detail/${item._id}`} style={{fontSize:'16px'}}>Read More</Link></div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blogdetails;
