import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTION_API = `${HTTP_SERVER}/api/questions`;

export const fetchAllQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return data;
};

export const updateQuestion = async (
  questionId: string,
  updatedQuestion: any
) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTION_API}/${questionId}`,
    updatedQuestion
  );
  return data;
};
