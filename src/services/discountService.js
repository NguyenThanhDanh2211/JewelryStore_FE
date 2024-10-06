import * as httpRequest from '~/utils/httpRequest';

export const getAllDiscount = async () => {
  try {
    const response = await httpRequest.get('discount/get-all-discount');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
