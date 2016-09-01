export function start(name) {
  return {
    type: 'START',
    name
  }
}

export function fillField(fieldIndex) {
  return {
    type: 'FIELD_FILL',
    payload: {
      fieldIndex
    }
  }
}

export function reset() {
  return {type: 'RESET'}
}
