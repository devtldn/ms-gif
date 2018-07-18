import React, { Component } from 'react';
import gifsJSON from './gifs.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifsJSON,
      score: 0,
      topScore: 0
    }
  }

  handleClick = id => {
    let clickCheck = this.state.gifsJSON.filter(gif => gif.id !== id);

    let clickedGif = clickCheck[0];

    if (this.state.score < 12) {
      if (clickedGif.clicked === false) {
        this.setState({ score: this.state.score + 1 });
        clickedGif.clicked = true;
      } else {
        this.setState({ score: 0 });
        
        for (let i = 0; i < clickCheck.length; i++) {
          clickCheck[i].clicked = false;
        }
      }
    } else {
      this.setState({ score: 0 })
    }

    if (this.state.score >= this.state.topScore) {
      this.setState({ topScore: this.state.score })
    }
  }


  render() {
    const gifStyle = {
      margin: '1rem',
      height: '200px',
      width: '300px'
    }

    function shuffleGifs(array) {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    const shuffledGifs = shuffleGifs(this.state.gifsJSON);

    let gifArray = shuffledGifs.map(gif => {
      return (
        <img key={gif.id} onClick={this.handleClick} src={gif.source} alt="michaelscott" style={gifStyle}></img>
      )
    });

    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <h2 className="display-2">Sean's Everyday Moods</h2>
            <br />
            <h4>Your score: {this.state.score}</h4>
            <br />
            <h4>Top score: {this.state.topScore}</h4>
            <br />
            {gifArray}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
