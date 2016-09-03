const initialState = {
  gameId: null,
  name: '',
  startingGame: false,
  loadingGame: false,
};

export default function baseReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        name: action.name,
        startingGame: true
      }

    case 'GAME_LOAD':
      return {
        ...state,
        loadingGame: true
      };

    case 'GAME_LOAD_DONE':
      return {
        ...state,
        gameId: action.payload.id,
        name: action.payload.name,
        loadingGame: false
      }

    case 'RESET':
      return {
        ...initialState,
        name: state.name
      }

    case 'START_DONE':
      return Object.assign({}, state, {
        gameId: action.payload,
        startingGame: false
      })

    default:
      return state;
  }
}
