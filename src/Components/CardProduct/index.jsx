import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/card.css';
import PropTypes from 'prop-types';
import changeImageSize from '../../services/changeImageSize';
import AddToCart from '../AddToCart';
import { addToStorage } from '../../services/storageCartItem';
import checkAvailability from '../../services/checkAvailability';

class index extends Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { price, thumbnail, title, id, updateAmount, availableQuantity } = this.props;
    const item = { price, thumbnail, title, id, availableQuantity };

    addToStorage(item);
    updateAmount();
  }

  render() {
    const { price, thumbnail, title, id } = this.props;
    const image = changeImageSize(thumbnail);

    return (
      <div className="card-product">
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div
            data-testid="product"
            id={ id }
            className="product"
          >
            <p className="product-title">{title}</p>
            <img src={ image } alt={ title } />
            <p>{`R$ ${price} `}</p>
          </div>
        </Link>
        <AddToCart
          addToCart={ this.addToCart }
          idTest="product-add-to-cart"
          disabledBtn={ !checkAvailability(id) }
        />
      </div>
    );
  }
}

index.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  updateAmount: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};

index.defaultProps = {
  id: '0',
};

export default index;
