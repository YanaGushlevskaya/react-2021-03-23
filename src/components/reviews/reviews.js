import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../loader';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import { usersLoadingSelector, usersLoadedSelector, reviewsLoadingSelector, reviewsLoadedSelector } from '../../redux/selectors';

const Reviews = ({ reviews, restaurantId, loadReviews, loadUsers, userLoaded, reviewsLoaded }) => {
  useEffect(() => {
    loadReviews(restaurantId);
    loadUsers();
  }, [loadReviews, loadUsers, restaurantId]);

  return (
    <div className={styles.reviews}>
      {reviewsLoaded && userLoaded ? reviews.map((id) => (
        <Review key={id} id={id} />
      )) : <Loader />}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  userLoading: usersLoadingSelector(state),
  userLoaded: usersLoadedSelector(state),
  reviewsLoading: reviewsLoadingSelector(state),
  reviewsLoaded: reviewsLoadedSelector(state)
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
