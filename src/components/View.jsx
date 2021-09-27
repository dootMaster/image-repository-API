import React from 'react';
import Image from './Image.jsx';
const axios = require('axios');

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    axios.get('get')
    .then(response => {
      this.setState({
        photos: response.data,
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    let { photos } = this.state;
    return (
      <div className='View'>
        {photos.map((item, i) =>
          <Image
            url={item.img_path}
            key={i}
          />)}
      </div>
    )
  }
}

export default View;

