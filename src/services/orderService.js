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
