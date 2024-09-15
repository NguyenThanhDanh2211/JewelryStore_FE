import * as httpRequest from '~/utils/httpRequest';

export const login = async (userData) => {
  try {
    const response = await httpRequest.post('user/login', userData, {
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
