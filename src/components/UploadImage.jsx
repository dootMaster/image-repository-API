import React from 'react';
const axios = require('axios');

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            file: null,
          };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for(const key of Object.keys(this.state.file)) {
      formData.append('img', this.state.file[key])
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post('/upload', formData, config)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
        alert('Your file could not be uploaded at this time.')
      });
  }

  onChange(e) {
    this.setState({file: e.target.files});
  }

  render() {
    return (
      <div className='Form'>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
            <label className='form-input'>Select Files
              <input type='file' name='img' encType='multipart/form-data' multiple onChange={this.onChange} />
            </label>
            <button className='form-button' type='submit'>Upload</button>
        </form>
      </div>
    )
  }
}

export default UploadImage;