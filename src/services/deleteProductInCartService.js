import * as httpRequest from '~/utils/httpRequest';

export const delProductInCart = async (productId, token) => {
  const data = { productId };
  try {
    const response = await httpRequest.del('cart/delete', data, {
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
