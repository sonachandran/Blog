import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdHorizontalRule } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const Detail = () => {
const[blog,setblog]=useState('')
const {id}=useParams()
useEffect(()=>{
    const fetchblogs=async()=>{
        let response=await axios.get(`http://localhost:8000/findblog/${id}`)
        console.log("blogdetails",response);
        setblog(response.data)
    }
    fetchblogs()
},[])
console.log('blog',blog);

  return (
    <>
    <div style={{display:'flex ',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
    <div style={{color:'black',width:'80%',marginTop:'20px'}}><hr /></div> 
    <h1 className='flex mt-2 mb-2'><b>{blog.title}</b></h1>
    <div style={{color:'black',width:'80%'}}><hr /></div> 
    
    <b className=' d-flex mt-3 mb-3'>{blog.name}</b>
    <img src={`http://localhost:8000/uploads/${blog.image}`}style={{height:'450px',width:'700px'}} className='img-fluid' alt="" />
    <div className='box4 mt-1' style={{fontSize:'20px'}}>
    <p className='mt-4 flex'>{blog.description}</p>
    </div>
    </div>
    </>

    
  )
}

export default Detail