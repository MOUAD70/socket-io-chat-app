import axiosClient from "../api/axios";

// REGISTER 
export const registerUser = async (registerInfo) => {
  const res = await axiosClient.post("/users/register", registerInfo);
  return res.data;
};

// LOGIN
export const loginUser = async (loginInfo) => {
  const res = await axiosClient.post("/users/login", loginInfo);
  return res.data;
};

// GET USER BY ID
export const getUserById = async (userId) => {
  const res = await axiosClient.get(`/users/find/${userId}`);
  return res.data;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const res = await axiosClient.get("/users");
  return res.data;
};
