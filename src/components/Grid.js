import React, {PropTypes} from 'react';
import store from '../store';
import {fillField} from '../actions';

const circle = require('../circle.svg');
const cross = require('../cross.svg');

function Field({field, fieldIndex}) {
  function handleFieldFilled(e) {
    e.preventDefault();
    store.dispatch(fillField(field.id))
  }

  switch (field.filled) {
    case 'x':
      return (
        <div className="box is-filled">
          <img className="box-image" src={cross} alt="cross" />
        </div>
      )
    case 'o':
      return (
        <div className="box is-filled">
          <img className="box-image" src={circle} alt="circle" />
        </div>
      )

    default:
      return (
        <div
          className="box"
          onClick={handleFieldFilled}
        />
      )
  }
}

class Grid extends React.Component {
  render() {

    return (
      <div className="grid">

        {this.props.grid.map((field, index) => (
          <Field
            field={field}
            fillField={this.props.fillField}
            key={index}
          />
        ))}

        {this.props.gameFinished && <p className="end">Konec hry</p>}
      </div>
    )
  }
}

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  gameFinished: PropTypes.bool.isRequired,
  fillField: PropTypes.func.isRequired,
}

export default Grid;
