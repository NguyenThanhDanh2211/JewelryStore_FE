import * as httpRequest from '~/utils/httpRequest';

export const register = async (userData) => {
  try {
    const response = await httpRequest.post('user/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
