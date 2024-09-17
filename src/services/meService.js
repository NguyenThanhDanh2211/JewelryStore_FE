import * as httpRequest from '~/utils/httpRequest';

export const me = async (token) => {
  try {
    const response = await httpRequest.get('user/me', {
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
