import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import productStyles from '../product/product.module.css';
import style from './basketItem.module.css';

import { increment, decrement, remove } from '../../redux/actions';
import { ReactComponent as Close } from '../../icons/delete.svg';

import Button from '../button';

const BasketItem = (props, test) => {
  const { product, amount, increment, decrement, remove, fetchData, sum } = props;
  console.log(props, test);
  useEffect(() => {
    fetchData && fetchData(product.id);
  }, []); // eslint-disable-line

  return (
    <div className={productStyles.product} data-id="product">
      <div className={productStyles.content}>
        <div>
          <h4 className={productStyles.title}>{product.name}</h4>
          <p className={productStyles.description}>{product.ingredients.join(', ')}</p>
          <div className={productStyles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={productStyles.counter}>
            <div className={productStyles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={productStyles.buttons}>
              <Button onClick={decrement} icon="minus" />
              <Button onClick={increment} icon="plus" />
            </div>
          </div>
          <div className={cn(style.sum, style.product__remover)}>
            <h3>Sum</h3>
            {sum}
          </div>
          <div>
            <Button onClick={remove} icon="delete" />
          </div>

        </div>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  fetchData: PropTypes.func,
  // from connect
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(null, mapDispatchToProps)(BasketItem);
