import TYPES from "../TYPES";

const initialState = {
  loading: false,
};

export default function LoadingReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOADER: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
}
