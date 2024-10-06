import * as httpRequest from '~/utils/httpRequest';

export const getAllCart = async (token) => {
  try {
    const response = await httpRequest.get('cart/get-all', {
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

export const addToCart = async (productId, quantity, token) => {
  try {
    const response = await httpRequest.post(
      'cart/add',
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log('Error in addToCart:', error.response?.data || error);
    throw error;
  }
};

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

export const delAllProducts = async (token) => {
  try {
    const response = await httpRequest.dele('/cart/delete-all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error deleting all products from cart:', error);
    throw error;
  }
};
