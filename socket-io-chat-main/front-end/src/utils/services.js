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

// POST REQUEST
export const postRequest = async (url, body) => {
  try {
    const response = await axiosClient.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    let message;

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data) {
      message = error.response.data;
    } else {
      message = error.message;
    }

    return { error: true, message };
  }
};

// GET REQUEST
export const getRequest = async (url) => {
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    let message;

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data) {
      message = error.response.data;
    } else {
      message = error.message;
    }

    return { error: true, message };
  }
};
