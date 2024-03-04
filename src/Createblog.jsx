import React from 'react'

const Createblog = () => {
  return (
<div className='bgcolorr'>
   <h1 className='flex '>Create Your Blog</h1>
    <div className='box2 input2'>
   <input type="text" name='title'placeholder='Title' /> <br />
   <input type="text" name='description' placeholder='Description' /> <br />
   <input type="file" name='image'/>
   </div>

 </div>
  )
}

export default Createblog

