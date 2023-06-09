import React, { useState, useEffect } from "react";
import "./style/main.css";
import { BsCartPlus, BsCart3 } from "react-icons/bs";
import ShoppingCart from "./components/ShoppingCart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Bill from "./components/Bill";

const products = [
  {
    id: 1,
    name: "HuWei P50",
    description:
      "There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 199,
    image: require("./assets/images/product-1.png"),
  },
  {
    id: 2,
    name: "Iphone",
    description:
      "There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 229,
    image: require("./assets/images/product-2.png"),
  },
  {
    id: 3,
    name: "SamSung Watch",
    description:
      "There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 99,
    image: require("./assets/images/product-3.png"),
  },
  {
    id: 4,
    name: "Apple Watch",
    description:
      "There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 119,
    image: require("./assets/images/product-4.png"),
  },
  {
    id: 5,
    name: "Samsung s20",
    description:
      "There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 85,
    image: require("./assets/images/product-5.jpg"),
  },
  {
    id: 6,
    name: "Head Phone",
    description:
      " There are lots of great options for purchasing . Whether you buy from a retailer, a carrier, or online, finding the best option has never been so easy.",
    price: 149,
    image: require("./assets/images/product-6.png"),
  },
];

function App() {
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  const [checkbox, setCheckbox] = useState([]);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  const handleCheck = (event) => {
    let updatedList = [...checkbox];
    if (event.target.checked) {
      updatedList = [...checkbox, JSON.parse(event.target.value)];
    } else {
      updatedList.splice(checkbox.indexOf(JSON.parse(event.target.value)), 1);
    }
    setCheckbox(updatedList);
  };

  const productRomoveDup = productsInCart.reduce((finalArray, current) => {
    let obj = finalArray.find((item) => item.id === current.id);
    if (obj) {
      return finalArray;
    }
    return finalArray.concat([current]);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <div className="navbar">
              <Link to="/">
                <h3 className="logo">Logo</h3>
              </Link>
              <button className="btn shopping-cart-btn">
                <Link to="/cart">
                  <BsCart3 size={24} />
                </Link>
                {productsInCart.length > 0 && (
                  <span className="product-count">
                    {productRomoveDup.length}
                  </span>
                )}
              </button>
            </div>
            <main>
              <h2 className="title">Products</h2>
              <div className="products">
                {products.map((product) => (
                  <div className="product" key={product.id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.image}
                    />
                    <h4 className="product-name">{product.name}</h4>
                    <p>{product.description}</p>
                    <span className="product-price">{product.price}$</span>
                    <div className="buttons">
                      <button className="btn">Buy Now</button>
                      <button
                        className="btn"
                        onClick={() => addProductToCart(product)}
                      >
                        <BsCartPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </Route>
        <Route path="/checkout">
          <Bill products={checkbox} />
        </Route>
        <Route path="/cart">
          <ShoppingCart
            products={productRomoveDup}
            onQuantityChange={onQuantityChange}
            onProductRemove={onProductRemove}
            checkbox={checkbox}
            handleCheck={handleCheck}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
