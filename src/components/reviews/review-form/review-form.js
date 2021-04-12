import React from 'react';
import useForm from '../../../hooks/use-form';

import Rate from '../../rate';
import styles from './review-form.module.css';
import { connect } from 'react-redux';
import { usercreate, reviewcreate } from '../../../redux/actions';
import Button from '../../button';

const INITIAL_VALUES = { name: '', text: '', rating: 3 };

const ReviewForm = ({ userCreate, reviewCreate, activeRestaurant }) => {
  const { values, handlers, reset } = useForm(INITIAL_VALUES);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    userCreate(values);
    reviewCreate(values);
    reset();
  };

  return (
    <div className={styles.reviewForm}>
      <h4 className={styles.addReviewTitle}>Leave your review</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.reviewFormItem}>
          <input
            placeholder="Your name"
            className={styles.message}
            {...handlers.name}
          />
        </div>
        <div className={styles.reviewFormItem}>
          <textarea
            placeholder="Your review"
            className={styles.message}
            {...handlers.text}
          />
        </div>
        <div className={styles.rateWrap}>
          <span>Rating: </span>
          <span>
            <Rate {...handlers.rating} />
          </span>
        </div>
        <div className={styles.publish}>
          <Button primary block>
            PUBLISH REVIEW
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, (dispatch) => {
  return {
    userCreate: ({ name }) => (dispatch(usercreate(name))),
    reviewCreate: ({ text, rating, activeRestaurant }) => (dispatch(reviewcreate(text, rating, activeRestaurant))),
  }
})(ReviewForm);
