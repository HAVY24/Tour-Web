import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//GET: payment/card/{userId}
export const getPaymentCard = async (userId) => {
  try {
    const response = await apiClient.get(`/payment/card/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: payment/create/info
export const createPaymentInfo = async (info) => {
  try {
    const response = await apiClient.post(`/payment/create/info`, info);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: payment/update/status
export const setPaymentStatus = async (data) => {
  try {
    const response = await apiClient.patch(`/payment/update/status`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: payment/statistics/{year}
export const getPaymentStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/payment/statistics/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: payment/statistics/revenue/{year}
export const getRevenueStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/payment/statistics/revenue/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: invoice/get/{user_id}
export const getPayment = async (user_id) => {
  try {
    const response = await apiClient.get(`/invoice/get/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: invoice/pdf
export const downloadPDF = async (transactionId) => {
  try {
    const response = await apiClient.get(`/invoice/pdf`, {
      params: { transactionId },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice-${transactionId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: card/store/address
export const storeBillingAddress = async (user_id, billingAddress) => {
  try {
    const response = await apiClient.post(`/card/store/address`, {
      user_id: user_id,
      billingAddress: billingAddress,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: card/get
export const getPaymentCardByUserId = async (user_id) => {
  try {
    const response = await apiClient.get(`/card/get`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
