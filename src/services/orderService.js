import * as httpRequest from '~/utils/httpRequest';

export const placeOrder = async (token, orderData) => {
  try {
    const response = await httpRequest.post('/order/place-order', orderData, {
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

export const getAllOrder = async (token) => {
  try {
    const response = await httpRequest.get('/order/get-order', {
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

export const cancelOrder = async (token, orderId) => {
  try {
    const response = await httpRequest.put(
      `/order/cancel/${orderId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
