import * as httpRequest from '~/utils/httpRequest';

export const register = async (userData) => {
  try {
    const response = await httpRequest.post('user/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response; // Return the response data
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};
