import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Blog1.css'
import {Link,Outlet} from 'react-router-dom'

function Appnav() {
  return (
<div className='appnav'>
    <Navbar expand="lg" className="bg-body-tertiary appnav">
    <Container >
      <Navbar.Brand >BLOG</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav " className=' justify-content-end '>
        <Nav style={{ gap:'25px',fontSize:'18px'}} >
       <Link to='./bloghome' className='text'> <b>HOME</b></Link>  
       <Link to='./registration' className='text'> <b>SIGN IN</b></Link>  
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet/>
  </div>
   
 );
}

export default Appnav;