export default function appReducer(
  state = { searchInp: "", series: [], subscribers: [], members: [] },
  action
) {
  switch (action.type) {
    //search input
    case "SET_SEARCH_INP":
      state = { ...state, searchInp: action.payload };
      console.log("srch from redux:", state.searchInp);
      return { ...state };

    //Series
    case "SET_SERIES":
      return { ...state, series: action.payload };

    case "DEL_SERIE":
      let delSerieIdx = state.series.findIndex(
        (x) => x._id === action.payload._id
      );
      console.log(delSerieIdx);
      if (delSerieIdx >= 0) {
        state.series.splice(delSerieIdx, 1);
        console.log(state.series);
        return { ...state };
      }
      return state;

    //members
    case "GET_MEMBERS":
      return { ...state, members: action.payload };
    default:
      return state;
  }
}
