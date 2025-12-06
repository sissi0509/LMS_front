import axios from "axios";
import { findAllUsers } from "../Account/client";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const findCourseById = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );

  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};
export const updateModule = async (courseId: string, module: any) => {
  console.log("moduleid:", module._id);
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return response.data;
};

export const deleteAssignment = async (
  courseId: string,
  assignmentId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/enrollments/${courseId}`,
    {}
  );
  console.log(data);
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/enrollments/${courseId}`);
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return response.data;
};

export const findCourseQuizzes = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
}

export const findQuizPoints = async (quizId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}/points`);
  return response.data;
}

export const createQuizForCourse = async (courseId: string, quizData: any) => {
  const response = await axios.post(`${HTTP_SERVER}/api/courses/${courseId}/quizzes`, quizData);
  return response.data;
}

export const updateQuiz = async (quizId: string, updateData: any) => {
  const response = await axios.put(`${HTTP_SERVER}/api/quizzes/${quizId}`, updateData);
  return response.data;
}

export const getQuizById = async (quizId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}`);
  return response.data;
}

export const deleteQuizFromCourse = async (courseId: string, quizId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
  return response.data;
}

export const copyQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/copy`)
  return response.data;
}