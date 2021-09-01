import React from 'react';
import axios, {publicAxiosInstance} from '../../../axios';
const CreateTokenAsync = async userModel => {
  const result = await axios.post(`/auth/createToken`, userModel);
  return result.data;
};
const CreateUserAsync = async userModel => {
  const result = await axios.post(`/auth/createUser`, userModel);
  return result.data;
};
const GetCurrentUserAsync = async token => {
  const result = await axios.get(`/auth/getCurrentUser?token=${token}`);
  return result.data;
};
export {CreateTokenAsync, CreateUserAsync, GetCurrentUserAsync};
