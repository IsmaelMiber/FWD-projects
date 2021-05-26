import useQuestions from "../../Hooks/useQuestions";
import Question from "../Question";

export default function UnAnsweredQuestions(props) {
  const questions = useQuestions(false);

  if (!questions) {
    return null;
  }

  return questions.map((question) => (
    <Question key={question.id} question={question} />
  ));
}
