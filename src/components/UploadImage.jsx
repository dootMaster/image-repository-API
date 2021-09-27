import React from 'react'
const axios = require("axios");

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            file: null,
          };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e){
  e.preventDefault();
  const formData = new FormData();
  formData.append('myImage', this.state.file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  axios.post("/upload-profile-pic", formData, config)
    .then((response) => {
      alert('maybe');
    }).catch((error) => {
      console.log(error);
      alert("Your file could not be uploaded at this time.")
    });
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
          <input type="file" name="myImage" enctype="multipart/form-data" onChange={this.onChange} />
          <button type="submit">Upload</button>
      </form>
    )
  }
}

export default UploadImage;