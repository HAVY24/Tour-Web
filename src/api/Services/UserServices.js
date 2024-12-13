import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//POST: user/ping
export const heartBeat = async (user_id) => {
  try {
    const response = await apiClient.post(`/user/ping`, {
      userId: user_id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/users
export const getUsers = async () => {
  try {
    const response = await apiClient.get(`/user/users`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/profile/{user_id}
export const getProfile = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/profile/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/account/{user_id}
export const getAccountInfo = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/account/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PUT: user/update/account
export const updateAccount = async (userInfo) => {
  try {
    const response = await apiClient.put(`/user/update/account`, userInfo);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//DELETE: user/delete/account/soft/{user_id}
export const deleteAccount = async (user_Id) => {
  try {
    const response = await apiClient.delete(
      `/user/delete/account/soft/${user_Id}`,
      {
        user_id: user_Id,
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PUT: user/profile/update
export const updateUserProfile = async (profile) => {
  try {
    const response = await apiClient.put(`/user/profile/update`, profile);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: admin/restore/account
export const restoreAccount = async (UserId) => {
  try {
    const response = await apiClient.post(`/admin/restore/account`, {
      UserId: UserId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/request/payment
export const getUserPaymentRequest = async () => {
  try {
    const response = await apiClient.get(`/admin/request/payment`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/request/payment/pending
export const getPaymentPending = async () => {
  try {
    const response = await apiClient.get(`/admin/request/payment/pending`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/request/payment/processed
export const getProcessedPayment = async () => {
  try {
    const response = await apiClient.get(`/admin/request/payment/processed`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/request/payment/accepted
export const getAcceptedPayment = async () => {
  try {
    const response = await apiClient.get(`/admin/request/payment/accepted`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/request/payment/unaccepted
export const getUnacceptedPayment = async () => {
  try {
    const response = await apiClient.get(`/admin/request/payment/unaccepted`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: admin/ban
export const banUser = async (userId) => {
  try {
    const response = await apiClient.patch(`/admin/ban`, { userId });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: admin/unban
export const unbanUser = async (userId) => {
  try {
    const response = await apiClient.patch(`/admin/unban`, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/get/deleted/soft
export const getSoftDeletedUser = async () => {
  try {
    const response = await apiClient.get(`/admin/get/deleted/soft`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/get/banned
export const getBannedUser = async () => {
  try {
    const response = await apiClient.get(`/admin/get/banned`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/get/online
export const getOnlineUser = async () => {
  try {
    const response = await apiClient.get(`/admin/get/online`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/get/offline
export const getOfflineUser = async () => {
  try {
    const response = await apiClient.get(`/admin/get/offline`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/get/profile/block
export const getProfileBlockedUser = async () => {
  try {
    const response = await apiClient.get(`/admin/get/profile/block`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: admin/block/profile
export const blockUserProfile = async (userId) => {
  try {
    const response = await apiClient.patch(`/admin/block/profile`, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: admin/unblock/profile
export const unblockUserProfile = async (userId) => {
  try {
    const response = await apiClient.patch(`/admin/unblock/profile`, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/users/{id}
export const getuserById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//DELETE: admin/delete/permanently/{user_id}
export const deleteUser = async (user_id) => {
  try {
    const response = await apiClient.delete(
      `/admin/delete/permanently/${user_id}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: admin/statistics/register/{year}
export const getRegisterStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/admin/statistics/register/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
