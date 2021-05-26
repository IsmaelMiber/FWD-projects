import {
  normalizeData,
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions,
  _saveQuestion,
} from "../../Database/helpers";
import TYPES from "../TYPES";

function dispatchNormalizedData({ dispatch, response, getState }) {
  const { questions, options, users, oldFormat } = normalizeData(
    response.questions,
    response.users
  );

  const state = getState();
  const { currentUser } = state.users;
  dispatch({ type: TYPES.OLD_FORMAT_QUESTIONS, payload: oldFormat.questions });
  dispatch({ type: TYPES.OLD_FORMAT_USERS, payload: oldFormat.users });
  dispatch({ type: TYPES.QUESTIONS, payload: questions });
  dispatch({ type: TYPES.OPTIONS, payload: options });
  dispatch({ type: TYPES.USERS, payload: users });
  if (currentUser?.id) {
    dispatch({ type: TYPES.CURRENT_USER, payload: users.byId[currentUser.id] });
  }
  dispatch(loader(false));
}

export async function getData(dispatch, getState) {
  dispatch(loader(true));
  const usersRaw = await _getUsers();
  const questionsRaw = await _getQuestions();
  dispatchNormalizedData({
    dispatch,
    getState,
    response: {
      questions: questionsRaw,
      users: usersRaw,
    },
  });
}

export function answerQuestion({ uId, qId, aId }) {
  return async function answerQuestionWithDispatch(dispatch, getState) {
    dispatch(loader(true));
    const state = getState();
    const questions = state.questions.oldFormatQuestions;
    const users = state.users.oldFormatUsers;

    const response = await _saveQuestionAnswer({
      authedUser: uId,
      qid: qId,
      answer: aId,
      questions,
      users,
    });

    dispatchNormalizedData({ dispatch, getState, response });
  };
}

export function addNewQuestion(question) {
  return async function addNewQuestionWithDispatch(dispatch, getState) {
    dispatch(loader(true));
    const state = getState();
    const questions = state.questions.oldFormatQuestions;
    const users = state.users.oldFormatUsers;
    const response = await _saveQuestion({ question, questions, users });
    dispatchNormalizedData({ dispatch, getState, response });
  };
}

export function logout(dispatch, getState) {
  dispatch({
    type: TYPES.USER_LOGOUT,
  });
}

export function loader(loading) {
  return function loaderWithDispatch(dispatch, getState) {
    dispatch({ type: TYPES.LOADER, payload: loading });
  };
}
