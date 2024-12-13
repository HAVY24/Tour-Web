import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//GET: booking/info/{tourPackage_id}
export const getBookingInfo = async (tourPackageId) => {
  try {
    const response = await apiClient.get(`/booking/info/${tourPackageId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/contact/{user_id}
export const getContactInfo = async (user_id) => {
  try {
    const response = await apiClient.get(`/booking/contact/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: booking/create
export const sendBookingInfo = async (info) => {
  try {
    const response = await apiClient.post(`/booking/create`, info);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: booking/update/status
export const setStatus = async (data) => {
  try {
    const response = await apiClient.patch(`/booking/update/status`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: booking/check/status
export const checkStatus = async (userId) => {
  try {
    const response = await apiClient.post(`/booking/check/status`, {
      User_Id: userId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: booking/delete/soft/{bookingId}
export const softDeleteBooking = async (bookingId) => {
  try {
    const response = await apiClient.patch(`/booking/delete/soft/${bookingId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/{userId}
export const getMyBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/accepted/{userId}
export const getMyAcceptBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/accepted/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/unaccepted/{userId}
export const getMyUnacceptedBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/unaccepted/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/waiting/{userId}
export const getMyApprovalBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/waiting/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/pending/{userId}
export const getMyPendingBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/pending/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/user/canceled/{userId}
export const getMyCanceledBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/canceled/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/statistics/{year}
export const getBookingStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/booking/statistics/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
