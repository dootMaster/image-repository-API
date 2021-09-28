import React from 'react';
import Image from './Image.jsx';
import ImgTitle from './ImgTitle.jsx';
import Keywords from './Keywords.jsx';
const axios = require('axios');

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      keywords: [],
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

  searchByKeywords(e) {

  }

  render() {
    let { photos } = this.state;
    return (
      <div className='View'>

        {photos.map((item) =>
        <>
          <ImgTitle
            title={item.title}
          />
          <Image
            key={item.id}
            title={item.title}
            url={item.img_path}
          />
          <Keywords
            title={item.title}
          />
        </>
          )}
      </div>
    )
  }
}

export default View;

