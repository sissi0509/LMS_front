import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTION_API = `${HTTP_SERVER}/api/questions`;
const USER_API = `${HTTP_SERVER}/api/users`;

export const fetchAllQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return data;
};

export const createOrUpdateQuestion = async (
  questionId: string,
  updatedQuestion: any,
  quizId: string
) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    updatedQuestion
  );
  return data;
};

export const deleteQuestionFromQuiz = async (
  quizId: string,
  questionId: string
) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return data;
};

export const fetchAttempt = async (userId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USER_API}/${userId}/quizzes/${quizId}/attempts`
  );
  return data;
};

export const getGrade = async (answers: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/grade`,
    answers
  );
  return data;
};
