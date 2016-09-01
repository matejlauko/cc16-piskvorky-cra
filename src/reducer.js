const Field = {
  filled: null
}

const initialState = {
  name: '',
  startingGame: false,
  play: {
    turn: 'x',
    grid: [Field, Field, Field, Field, Field, Field, Field, Field, Field],
    loadingGame: false,
    submittingFill: false,
  }
}

export default function reducer(state = initialState, action = {}) {
  if (!state) return initialState;

  switch (action.type) {
    case 'START':
      return {
        ...state,
        name: action.name
      }

    case 'GAME_LOAD':
      return state;

    case 'FIELD_FILL':
      const newField = {...Field, filled: state.play.turn};
      console.log(newField);
      console.log('1', state.play.grid.slice(0, action.payload.fieldIndex));
      console.log('2', state.play.grid.slice(action.payload.fieldIndex + 1));
      return {
        ...state,
        play: {
          ...state.play,
          grid: [
            ...state.play.grid.slice(0, action.payload.fieldIndex),
            newField,
            ...state.play.grid.slice(action.payload.fieldIndex + 1)
          ],
          turn: (state.play.turn === 'x') ? 'o' : 'x',
        }
      }

    case 'RESET':
      return {
        ...initialState,
        name: state.name
      }

    default:
      return state;
  }
}
