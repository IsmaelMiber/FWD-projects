import useQuestions from "../../Hooks/useQuestions";
import Question from "../Question";

export default function AnsweredQuestions(props) {
  const questions = useQuestions(true);

  if (!questions) {
    return null;
  }

  return questions.map((question) => (
    <Question key={question.id} question={question} />
  ));
}
