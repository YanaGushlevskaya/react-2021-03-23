import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import style from './basket.module.css';
import BasketItem from '../basketItem';

import { ReactComponent as BasketIcon } from '../../icons/basket.svg';
import { ReactComponent as Close } from '../../icons/delete.svg';

const Basket = ({ orderedProducts, orderSum }) => {
  const [activeBasket, setActiveBasket] = useState(style.hidden);

  const content = orderSum ?
    orderedProducts.map(({ product, sum, id, amount }) => <BasketItem product={product} sum={sum} key={id} amount={amount} />) :
    'You have not choose anything yet.';

  return (
    <div className={cn(style.basket, activeBasket)} >
      <button className={style.basket__icon} onClick={() => setActiveBasket('')}>
        <BasketIcon />
      </button>
      <div className={style['basket__popup-wrapper']}>
        <div className={style.basket__popup}>
          <div className={style.popup__header}>
            <button onClick={() => setActiveBasket(style.hidden)}>
              <Close />
            </button>
          </div>
          <div className={style.popup__content}>
            {content}
          </div>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  const allProducts = state.restaurants.flatMap((restaurant) => { return restaurant.menu });
  const orderedProducts = Object.keys(state.order)
    .map((productId) => allProducts.find((product) => product.id === productId))
    .map((product) => ({
      product,
      amount: state.order[product.id],
      sum: state.order[product.id] * product.price,
    }));

  const orderSum = orderedProducts.length ? orderedProducts.reduce((acc, product) => { return acc + product.sum }) : 0;

  return { orderedProducts, orderSum };
};

export default connect(mapStateToProps)(Basket);