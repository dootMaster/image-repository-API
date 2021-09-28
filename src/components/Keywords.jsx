import React from 'react';


class Keywords extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      keywords: [],
      field: '',
    };
  }

  componentWillMount() {
    this.getKeywords();
  }

  getKeywords(title) {
    fetch(`http://localhost:3000/keywords/${this.props.title}`)
      .then(response => {
        response.json().then(data => {
          this.setState({
            keywords: data,
          });
        });
      })
      .catch(err => console.log(err));
  }

  addKeyword(word) {
    fetch(`http://localhost:3000/addKeyword/${this.props.title}/${word}`, {
      method: 'POST',
    })
    .then(response => {
      this.getKeywords();
    })
    .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({field: e.target.value});
  }

  render() {
    const { keywords, field } = this.state;
    return(
      <div className="keyword-wrapper">
        {keywords.map((item) => {
            return <span className="keyword">{item.keyword}</span>
        })}
        <div>
          <input type='text' value={field} onChange={(e) => this.onChange(e)}></input>
          <button onClick={() => this.addKeyword(field)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Keywords;