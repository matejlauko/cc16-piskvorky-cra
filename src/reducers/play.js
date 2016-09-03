const Field = {
  id: null,
  filled: null
}

function makeGrid() {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = {...Field, id: i + 1}
  }
  return grid;
}

const initialState = {
  turn: 'x',
  grid: makeGrid(),
  submittingFill: false,
}

export default function playReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FIELD_FILL':
      const field = state.grid.find((field) => field.id === action.payload);
      const updatedField = {...field, filled: state.turn};
      const fieldIndex = state.grid.indexOf(field);
      return {
        ...state,
        submittingFill: true,
        grid: [
          ...state.grid.slice(0, fieldIndex),
          updatedField,
          ...state.grid.slice(fieldIndex + 1)
        ],
        turn: (state.turn === 'x') ? 'o' : 'x',
      }

    case 'FIELD_FILL_DONE':
      return {
        ...state,
        submittingFill: false
      }

    case 'GAME_LOAD_DONE':
      const payload = action.payload;
      return {
        ...state,
        grid: payload.grid,
        turn: payload.turn,
      }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
