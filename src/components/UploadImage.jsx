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
  for (const key of Object.keys(this.state.file)) {
    formData.append('img', this.state.file[key])
  }
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  axios.post("/upload-profile-pic", formData, config)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
      alert("Your file could not be uploaded at this time.")
    });
  }

  onChange(e) {
    this.setState({file: e.target.files});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
          <input type="file" name="img" encType="multipart/form-data" multiple onChange={this.onChange} />
          <button type="submit">Upload</button>
      </form>
    )
  }
}

export default UploadImage;