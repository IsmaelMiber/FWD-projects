import UsersReducer from "./users";
import QuestionsReducer from "./questions";
import OptionsReducer from "./options";
import LoadingReducer from "./loader";
import { combineReducers } from "redux";

export default combineReducers({
  users: UsersReducer,
  questions: QuestionsReducer,
  options: OptionsReducer,
  loader: LoadingReducer,
});
