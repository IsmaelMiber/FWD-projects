import TYPES from "../TYPES";

const initialState = {
  options: null,
};

export default function OptionsReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.OPTIONS: {
      return {
        ...state,
        options: action.payload,
      };
    }
    default:
      return state;
  }
}
