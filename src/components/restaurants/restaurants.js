import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Basket from '../basket';
import Header from '../header';
import style from './style.module.css';

const Restaurants = ({ restaurants }) => {
  const [activeRestaurantId, setActiveRestaurant] = useState(restaurants[0].id);

  const activeRestaurant = useMemo(
    () => restaurants.find(({ id }) => id === activeRestaurantId),
    [activeRestaurantId, restaurants]
  );

  const tabs = restaurants.map(({ id, name }) => ({ id, title: name }));

  return (
    <div>
      <div className={style['header--bottom']}>
        <Tabs
          tabs={tabs}
          activeId={activeRestaurantId}
          onChange={setActiveRestaurant}
        />
        <Basket restaurant={activeRestaurant} />
      </div>
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
