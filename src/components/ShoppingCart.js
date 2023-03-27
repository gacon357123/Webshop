import React from "react";
import "../style/shoppingCart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function ShoppingCart({
  products,
  onProductRemove,
  onQuantityChange,
  checkbox,
  handleCheck,
}) {
  const sum = () => {
    if (checkbox.length > 0) {
      const sumprice = checkbox
        .map((item) => item.price * item.count)
        .reduce((prev, next) => prev + next);
      return sumprice;
    }
  };

  return (
    <div className="modal">
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}
          {products.map((product) => (
            <div className="cart-product" key={product.id}>
              <div className="card-product-left">
                <input
                  type="checkbox"
                  className="input-checkbox"
                  value={JSON.stringify(product)}
                  onChange={handleCheck}
                />
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h2>
                    <b> {product.name}</b>
                  </h2>
                </div>
              </div>
              <div className="card-product-right">
                <span className="product-price">
                  {product.price * product.count}$
                </span>
                <select
                  className="count"
                  value={product.count}
                  onChange={(event) => {
                    onQuantityChange(product.id, event.target.value);
                  }}
                >
                  {[...Array(50).keys()].map((number) => {
                    const num = number + 1;
                    return (
                      <option value={num} key={num}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn remove-btn"
                  onClick={() => onProductRemove(product)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="TotalPrice">
            <p>
              You have ({checkbox.length}) product, Total Price: {sum()}$
            </p>
            {products.length > 0 && (
              <Link className="btn-checkout" to="/checkout">
                <button
                  className="btn checkout-btn"
                  disabled={checkbox.length === 0 ? true : false}
                >
                  Proceed to checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
