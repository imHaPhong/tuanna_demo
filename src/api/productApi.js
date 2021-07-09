import clientApi from "./ClientApi";

const productApi = {
  getAll: () => {
    const url = "product";
    return clientApi.get(url);
  },
  getCategory: () => {
    const url = "category";
    return clientApi.get(url);
  },
  filterBy: (params) => {
    const url = "product";
    return clientApi.get(url, {
      params,
    });
  },
  getDetail: (params) => {
    const url = "productDetail";
    return clientApi.post(url, params);
  },
  addToCart: (params) => {
    const url = "addToCart";
    return clientApi.post(url, params);
  },
  getWishlist: (params) => {
    const url = "wishlist";
    return clientApi.post(url, params);
  },
  getCart: (params) => {
    const url = "cart";
    return clientApi.get(url);
  },
  updateCart: (params) => {
    const url = "updateCart";
    return clientApi.post(url, params);
  },
};

export default productApi;
