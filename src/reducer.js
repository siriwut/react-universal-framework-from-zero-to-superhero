export default function reducer(state, action) {
  switch (action.type) {
    case 'SUB1':
      return {
        ...state,
        sub1: action.payload,
      }
    case 'SUB2':
      return {
        ...state,
        sub2: action.payload,
      }
    case 'SUB3':
      return {
        ...state,
        sub3: action.payload,
      }
    default:
      return state
  }
}
