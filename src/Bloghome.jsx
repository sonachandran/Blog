import React from 'react'
import './Blog1.css'
import {Link} from 'react-router-dom'
const Bloghome = () => {
  return (
   <>
<div className='bg '>
   <div className='flex'>
      <h1 className='head'>"Unlocking the power of self-expression   
          <br />through the art of blogging."</h1>          
    </div>
    <div  className='flex'  >
   <Link to='/registration'><button className='btn2'><b>create your blog</b></button></Link> 
     </div> 
    
</div>

<div className='background2'>
  <div className='row' style={{padding:'100px',fontSize:'28px'}}>
    <div >
       <h1 className='col font'>"Embracing creativity and connection <br/>  in the digital age."</h1>
    </div>
    <p className='font2'>Create a beautiful blog that fits your style. <br /> Choose from a selection of easy-to-use templates  all with flexible <br /> layouts and hundreds of background images  or design something new.
</p>
    
  </div>
  </div>
  </>
  )
}

export default Bloghome