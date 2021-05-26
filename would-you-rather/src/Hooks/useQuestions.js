import { useSelector } from "react-redux";

export default function useQuestions(answered = false) {
  const questionsTable = useSelector((state) => state.questions.questions);
  const user = useSelector((state) => state.users.currentUser);

  if (!questionsTable && !user) {
    return null;
  }
  const { byId } = questionsTable;
  const userAnsweredQuestionsIds = Object.keys(user.answers);

  const questions = Object.values(byId).filter(
    (question) => userAnsweredQuestionsIds.includes(question.id) == answered
  );

  return questions;
}
