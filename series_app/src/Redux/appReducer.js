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
      state.series.push(action.payload);
      return { ...state };

    case "UPDATE_SERIE":
      let updatedSerie = state.series.findIndex(
        (x) => x._id === action.payload.id
      );
      state.series[updatedSerie] = {
        ...state.series[updatedSerie],
        name: action.payload.Serie.name,
        genres: action.payload.Serie.genres,
        premiered: action.payload.Serie.premiered,
      };
      return { ...state };
    //members
    case "GET_MEMBERS":
      return { ...state, members: action.payload };

    case "UPDATE_MEMBER":
      let updateMember = state.members.findIndex(
        (x) => x._id === action.payload.id
      );
      state.members[updateMember] = {
        ...state.members[updateMember],
        name: action.payload.member.name,
        email: action.payload.member.email,
        city: action.payload.member.city,
      };
      return { ...state };
      case "ADD_MEMBER":
      state.members.push(action.payload);
      return { ...state };

    case "DEL_MEMBER":
      let delMemberIdx = state.members.findIndex(
        (x) => x._id === action.payload
      );
      if (delMemberIdx >= 0) {
        state.members.splice(delMemberIdx, 1);
        return { ...state };
      }   
       //Subscriptions
    case "GET_SUBSCRIPTIONS":
      return { ...state, subscription: action.payload };

    case "ADD_SUB":
      state.subscription.push(action.payload);
      return { ...state };

    default:
      return state;
  }
}
