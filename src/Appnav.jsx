import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Blog1.css'
import {Link,Outlet} from 'react-router-dom'
import { IoPerson } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";


function Appnav() {
  return (
<div className='appnav'>
    <Navbar expand="lg" className="bg-body-tertiary appnav">
    <Container >
      <Navbar.Brand ><b style={{fontSize:'25px'}}>MY BLOG</b></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav " className=' justify-content-end '>
        <Nav style={{ gap:'30px',fontSize:'20px',padding:'20px'}} >
       <Link to='./bloghome' className='text'>HOME</Link>  
       <Link to='./registration' className='text'>REGISTER</Link>  
       <Link to='./createblog' className='text'>CREATE YOURS</Link> 
       <Link to='./blogs' className='text'>BLOGS</Link> 
       <Link to='./profile' style={{textDecoration:'none',fontSize:'px'}}><RiAccountPinCircleFill/></Link> 
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet/>
  </div>
   
 );
}

export default Appnav;

