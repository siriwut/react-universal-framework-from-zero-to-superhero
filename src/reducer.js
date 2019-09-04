export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_HOME_SUCCESS':
      return {
        ...state,
        home: action.payload,
      }
    default:
      return state
  }
}
