import React, { Component, PropTypes } from 'react';
import './App.css';
import Grid from './components/Grid';
import {connect} from 'react-redux';
import * as actions from './actions';

class App extends Component {
  handleStartClick = () => {
    const name = this.refs.nameInput.value;
    this.props.start(name)
  }

  handleResetClick = () => {
    this.props.reset();
  }

  render() {
    return (
      <div className="App">

        {!this.props.name && (
          <div className="name">
            <input className="name-input" type="text" ref="nameInput" placeholder="Jméno hráče" />
          </div>
        )}

        {this.props.name && (
          <Grid
            grid={this.props.grid}
            gameFinished={this.props.gameFinished}
            fillField={this.props.fillField}
          />
        )}

        <div className="buttons">
          {(this.props.name)
            ? <button className="button" onClick={this.handleResetClick}>Reset</button>
            : <button className="button" onClick={this.handleStartClick}>Start</button>
          }
        </div>

        <p className="turn">
          Na řadě je: {this.props.turn === 'x'
            ? <img className="turn-img" src={require('./cross.svg')} alt="cross" />
            : <img className="turn-img" src={require('./circle.svg')} alt="circle" />
          }
      </p>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const grid = state.play.grid;
  const gameFinished = grid.every((field) => field.filled !== null);

  return {
    name: state.name,
    turn: state.play.turn,
    grid,
    gameFinished
  }
}

App.propTypes = {
  grid: PropTypes.array.isRequired,
  name: PropTypes.string,
  turn: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  actions
)(App);
