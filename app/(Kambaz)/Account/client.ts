import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signin`,
      credentials
    );
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    throw new Error("Signin failed. Please try again.");
  }
};

export const signup = async (user: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signup`,
      user
    );
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    throw new Error("Signup failed. Please try again.");
  }
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUserById = async (id: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};
