export default function appReducer(
  state = { searchInp: "", series: [], subscription: [], members: [] },
  action
) {
  switch (action.type) {
    //search input
    case "SET_SEARCH_INP":
      state = { ...state, searchInp: action.payload };
      return { ...state };

    //Series
    case "SET_SERIES":
      return { ...state, series: action.payload };

    case "DEL_SERIE":
      let delSerieIdx = state.series.findIndex(
        (x) => x._id === action.payload._id
      );
      if (delSerieIdx >= 0) {
        state.series.splice(delSerieIdx, 1);
        return { ...state };
      }
      return state;

      case "ADD_SERIE":
        state.series.push(action.payload)
        console.log('series after add' , state.series)
        return{...state}

      case "UPDATE_SERIE": 
      let updatedSerie = state.series.findIndex(x => x._id === action.payload._id)
      state.series.splice(updatedSerie, 1, action.payload)
      return {...state}
    //members
    case "GET_MEMBERS":
      return { ...state, members: action.payload };

    //Subscriptions
    case "GET_SUBSCRIPTIONS":
      return {...state , subscription : action.payload}
    default:
      return state;
  }
}
