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
      searchTerm: '',
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

  searchByKeywords(word) {
    axios.get(`search/${word}`)
    .then(response => {
      this.setState({
        photos: response.data,
      })
    })
    .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  render() {
    const { photos, searchTerm } = this.state;
    return (
      <div className='View'>
        <input type="text" value={searchTerm} onChange={(e) => this.onChange(e)}></input>
        <button onClick={() => this.searchByKeywords(searchTerm)}>Search</button>
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

