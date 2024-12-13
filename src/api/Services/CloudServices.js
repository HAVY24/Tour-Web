import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//POST: cloud/upload/image
export const sendImage = async (file, folder) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const response = await apiClient.post("/cloud/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
