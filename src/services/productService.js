import * as httpRequest from '~/utils/httpRequest';

export const getProductBySlug = async (slug) => {
  try {
    const response = await httpRequest.get(`product/${slug}`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
