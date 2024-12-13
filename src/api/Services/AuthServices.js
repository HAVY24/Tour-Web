import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//POST: auth/signin
export const signin = async (user) => {
  try {
    const response = await apiClient.post(`/auth/signin`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/signup
export const signup = async (user) => {
  try {
    const response = await apiClient.post(`/auth/signup`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: auth/signout
export const signout = async () => {
  try {
    const response = await apiClient.get(`/auth/signout`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/password/check
export const passwordCheck = async (data) => {
  try {
    const response = await apiClient.post(`/auth/password/check`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/google-login
export const googleAuth = async (IdToken) => {
  try {
    const response = await apiClient.post(`/auth/google-login`, { IdToken });
    return response.data;
  } catch (error) {
    console.error(
      "Error during Google Auth:",
      error.response?.data || error.message
    );
    handleApiError(error);
  }
};

//POST: auth/send-email
export const sendToEmail = async (emailRequest) => {
  try {
    const response = await apiClient.post(`/auth/send-email`, emailRequest);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/reset-password
export const resetPassword = async (request) => {
  try {
    const response = await apiClient.post(`/auth/reset-password`, request);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
