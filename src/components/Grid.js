import React, {PropTypes} from 'react';

const circle = require('../circle.svg');
const cross = require('../cross.svg');

function Field({field, fieldIndex, fillField}) {
  function handleFieldFilled(e) {
    e.preventDefault();
    fillField(fieldIndex)
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
            fieldIndex={index}
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
