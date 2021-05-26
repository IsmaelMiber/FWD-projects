import TYPES from "../TYPES";

const initialState = {
  users: null,
  currentUser: null,
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.OLD_FORMAT_USERS: {
      return {
        ...state,
        oldFormatUsers: action.payload,
      };
    }
    case TYPES.USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case TYPES.CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case TYPES.USER_LOGOUT: {
      return {
        ...state,
        currentUser: undefined,
      };
    }
    default:
      return state;
  }
}
