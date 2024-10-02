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

export const update = async (userData, token) => {
  try {
    const response = await httpRequest.post('user/update', userData, {
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
