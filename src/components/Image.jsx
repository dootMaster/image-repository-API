import React from 'react';

function Image ({ url }) {
  return (
    <img className='Image' src={`http://localhost:3000/uploads/${url}`}></img>
  )
}

export default Image;