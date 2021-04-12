import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

const Restaurant = ({ restaurant, rating }) => {
  const { name, menu, reviews, id } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const averageRating = useMemo(() => {
    const total = rating.reduce((acc, rate) => acc + rate, 0);
    return Math.round(total / rating.length);
  }, [rating]);

  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];

  const content = {
    menu: <Menu menu={menu} key={restaurant.id} />,
    reviews: <Reviews reviews={reviews} activeRestaurant={id} />,
  }[activeTab];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {content}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  const restaurant = state.restaurants[props.restaurant];
  const reviews = state.reviews;

  const rating = restaurant['reviews'].map((review) => (reviews[review]['rating']));
  return {
    restaurant,
    rating
  }
};

export default connect(mapStateToProps)(Restaurant);
