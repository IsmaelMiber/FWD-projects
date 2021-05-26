import TYPES from "../TYPES";

const initialState = {
  questions: null,
};

export default function QuestionsReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.OLD_FORMAT_QUESTIONS: {
      return {
        ...state,
        oldFormatQuestions: action.payload,
      };
    }
    case TYPES.QUESTIONS: {
      return {
        ...state,
        questions: action.payload,
      };
    }
    case TYPES.ANSWER_QUESTION: {
      const { id, payload = {} } = action;
      let questions = { ...state.questions };
      const targetQuestion = questions.byId[id];
      questions.byId[id] = {
        ...targetQuestion,
        ...payload,
      };
      return {
        ...state,
        questions,
      };
    }
    default:
      return state;
  }
}
