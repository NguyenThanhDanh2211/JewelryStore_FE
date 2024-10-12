import * as httpRequest from '~/utils/httpRequest';

export const payment = async (amount) => {
  try {
    const response = await httpRequest.post('/payment', { amount });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkTransactionStatus = async (orderId) => {
  try {
    const response = await httpRequest.post('/payment/transaction-status', {
      orderId,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
