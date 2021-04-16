import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';
import { productLoadedSelector, productLoadingSelector } from '../../redux/selectors';
import { loadProducts } from '../../redux/actions';
import Loader from '../loader';

class Menu extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = {
    error: null,
    restaurantId: this.props.restaurantId,
    loading: this.props.loading,
    loaded: this.props.loaded,
  };

  componentDidMount() {
    if (!this.state.loading && !this.state.loaded[this.state.restaurantId]) {
      this.props.loadProducts(this.props.restaurantId);
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loading } = this.props;

    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            loading ? <Loader key={id} /> :
              <Product key={id} id={id} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: productLoadingSelector(state),
  loaded: productLoadedSelector(state)
});

const mapDispatchToProps = { loadProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
