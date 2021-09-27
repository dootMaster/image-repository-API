import React, { useState } from 'react';
import UploadImage from './components/UploadImage.jsx';
import View from './components/View.jsx';

const App = () => {

  return (
    <div className='App'>
      <UploadImage />
      <View />
    </div>
  )
}

export default App;