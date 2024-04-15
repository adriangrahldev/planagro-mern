import axios from "axios";

export const loginAction = (loginData: { email: string, password: string }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, loginData);
      const data = await response.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }

  });
}

export const registerAction = (registerData: { fullName: string, email: string, password: string, confirmPassword: string }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, registerData);
      const data = await response.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }

  });
}