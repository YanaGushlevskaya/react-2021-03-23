import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants.entities;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;
export const productLoadingSelector = (state) => state.products.loading;
export const productLoadedSelector = (state) => state.products.loaded;
export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;
export const reviewsLoadingSelector = (state) => state.reviews.loading;
export const reviewsLoadedSelector = (state) => state.reviews.loaded;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
export const productSelector = (state, { id }) => productsSelector(state)[id];
export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => {
    console.log(review, users);
    return {
      ...review,
      user: review ? users[review.userId]?.name : ''
    }
  }
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  restaurantSelector,
  (reviews, restaurant) => {
    const ratings = reviews.length && restaurant.reviews.map((id) => reviews[id].rating);
    return ratings && Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);
