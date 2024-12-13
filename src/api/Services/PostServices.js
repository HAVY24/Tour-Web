import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//GET: /post/posts/1
export const getPosts = async () => {
  try {
    const response = await apiClient.get(`/post/posts/1`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /post/posts/0
export const getPostsNeedAuth = async () => {
  try {
    const response = await apiClient.get(`/post/posts/0`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /post/detail{id}
export const getPostDetail = async (id) => {
  try {
    const response = await apiClient.get(`/post/detail/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /post/user/{user_id}
export const getPostByUserId = async (user_id) => {
  try {
    const response = await apiClient.get(`/post/user/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: /post/create
export const createPost = async (postToCreate) => {
  try {
    const response = await apiClient.post(`/post/create`, postToCreate);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PUT: post/update/{id}
export const updatePost = async (postData, id) => {
  try {
    const response = await apiClient.put(`/post/update/${id}`, postData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: post/delete/soft/{id}
export const deleteSoftPost = async (id) => {
  try {
    const response = await apiClient.patch(`/post/delete/soft/${id}`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//DELETE: post/delete/permanent/{id}
export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/post/delete/permanent/${id}`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: post/restore
export const restorePost = async (id) => {
  try {
    const response = await apiClient.patch(`/post/restore/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: post/get/deleted/{user_id}
export const getDeletedPost = async (user_id) => {
  try {
    const response = await apiClient.get(`/post/get/deleted/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: post/statistics/{year}
export const getPostStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/post/statistics/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: post/orderby/{condition}/{flag}
export const getArrangePost = async (condition) => {
  try {
    const response = await apiClient.get(`/post/orderby/${condition}/1`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: post/orderby/{condition}/{flag}
export const getArrangeVefifyPost = async (condition) => {
  try {
    const response = await apiClient.get(`/post/orderby/${condition}/0`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: post/verify/{postId}
export const verifyPost = async (postId, status) => {
  try {
    const response = await apiClient.patch(`/post/verify/${postId}/${status}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
