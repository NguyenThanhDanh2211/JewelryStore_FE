import * as httpRequest from '~/utils/httpRequest';

export const addToCart = async (productId, quantity) => {
  try {
    const response = await httpRequest.post('cart/add-to-cart', {
      productId,
      quantity,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
