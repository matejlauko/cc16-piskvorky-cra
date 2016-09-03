const apiUrl = 'http://private-anon-afd6f8176f-ccpiskvorky.apiary-mock.com';

export function start(name) {
  return function(dispatch) {
    dispatch({
      type: 'START',
      name
    })

    fetch(apiUrl + '/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      }),
    })
    .then((response) => response.json(), (error) => {})
    .then((payload) => {
      dispatch({
        type: 'START_DONE',
        payload: payload.inserted.id
      })
    })

  }
}

export function loadGame(name) {
  return function(dispatch) {
    dispatch({
      type: 'GAME_LOAD',
    })

    fetch(apiUrl + '/games/' + name, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json(), (error) => {})
    .then((payload) => {
      dispatch({
        type: 'GAME_LOAD_DONE',
        payload
      })
    })

  }
}

export function fillField(fieldId) {
  return function(dispatch, getState) {
    dispatch({
      type: 'FIELD_FILL',
      payload: fieldId
    })

    const state = getState();

    fetch(apiUrl + '/fills', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_id: state.base.gameId,
        fiel_id: fieldId,
        filled: state.play.turn
      }),
    })
    .then((response) => response.json(), (error) => {})
    .then((payload) => {
      dispatch({type: 'FIELD_FILL_DONE'})
    })
  }
}

export function reset() {
  return {type: 'RESET'}
}
