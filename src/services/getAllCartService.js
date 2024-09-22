import * as httpRequest from '~/utils/httpRequest';

export const getAllCart = async (token) => {
  try {
    const response = await httpRequest.get('cart/get-all', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the headers
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
