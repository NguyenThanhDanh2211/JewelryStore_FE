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
    const response = await httpRequest.get('product/get-all-products');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilteredProducts = async ({
  page = 1,
  limit = 3,
  category,
  tag,
  minPrice,
  maxPrice,
}) => {
  try {
    const query = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(tag && { tag }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    }).toString();

    const response = await httpRequest.get(
      `product/get-filtered-products?${query}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getLimitProduct = async (page = 1, limit = 2) => {
//   try {
//     const response = await httpRequest.get(
//       `product/get-limit-product?page=${page}&limit=${limit}`
//     );

//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// // Function to get filtered products with pagination
