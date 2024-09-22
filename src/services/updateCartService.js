import * as httpRequest from '~/utils/httpRequest';

export const updateCart = async (productId, quantity, token) => {
  const data = { productId, quantity };
  // const token = localStorage.getItem('authToken');

  try {
    const response = await httpRequest.put('cart/update', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};
