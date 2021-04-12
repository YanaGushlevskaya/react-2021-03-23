import { normalizedReviews } from '../../fixtures';
import { normalizedRestaurants } from '../../fixtures';
import { REVIEWCREATE } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, restaurants = normalizedRestaurants, action) => {
  const { type, userId, text, rating, id, activeRestaurant } = action;

  switch (type) {
    case REVIEWCREATE:
      return (
        { ...reviews, [id]: { id, userId, text, rating } }
      )
    default:
      return reviews;
  }
};
