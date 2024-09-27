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

export const getAllProduct = async () => {
  try {
    const response = await httpRequest.get('product/get-all-product');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
