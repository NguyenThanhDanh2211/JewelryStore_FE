import * as httpRequest from '~/utils/httpRequest';

export const postComment = async (productId, cmt, token) => {
  try {
    const response = await httpRequest.post(`cmt/${productId}/comments`, cmt, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getComments = async (productId) => {
  try {
    const response = await httpRequest.get(`cmt/${productId}/comments`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
