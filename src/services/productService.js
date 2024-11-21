import * as httpRequest from '~/utils/httpRequest';

export const getProductBySlug = async (category, slug) => {
  try {
    const response = await httpRequest.get(`product/${category}/${slug}`);

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

export const getProductDiscounted = async () => {
  try {
    const response = await httpRequest.get('product/discounted');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getProductByCategory = async (category, collection = null) => {
//   try {
//     let url = `product/get/${category}`;
//     if (collection) {
//       url += `&collection=${collection}`;
//     }
//     const response = await httpRequest.get(url);

//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const getFilteredProducts = async ({
  page = 1,
  limit = 3,
  collect = null,
  tag = null,
  minPrice = null,
  maxPrice = null,
  men = null,
  category = null,
  sort = null,
}) => {
  try {
    const query = new URLSearchParams({
      page,
      limit,
      ...(collect && { collect }),
      ...(tag && { tag }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(sort && { sort }),
    }).toString();

    let endpoint;
    if (!category && men === null) {
      endpoint = `product/get-filtered-products/?${query}`;
    } else if (men === true) {
      endpoint = `product/get-filtered-products/?${query}&men=true`;
    } else {
      endpoint = `product/get-filtered-products/${category}?${query}`;
    }

    const response = await httpRequest.get(endpoint);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = async (q, type = 'less') => {
  try {
    const response = await httpRequest.get('product/search', {
      params: { q, type },
    });

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
