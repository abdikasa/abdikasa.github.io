export default (state = {}, action) => {
  switch (action.type) {
    case "NOM_FILM":
      return { ...state, [action.payload.uId]: action.payload };
    default:
      return state;
  }
};
