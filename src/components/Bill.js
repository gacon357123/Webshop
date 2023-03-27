import React, { useState } from "react";
import "../style/bill.css";
import { BsFillPinMapFill } from "react-icons/bs";
import Local from "./Local";

const Bill = ({ products }) => {
  const [visible, setVisible] = useState(false);
  const [Address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });
  return (
    <>
      <div className="wrapper">
        <Local visible={visible} onClose={() => setVisible(false)} />
        <h2 className="checkout">Check Out</h2>
        <div>
          <h3>
            <BsFillPinMapFill /> Address
          </h3>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <p>
              Nguyễn Quốc Bảo (+84) 911044774 163 Nguyễn Sỹ Sách, Phường 15,
              Quận Tân Bình, TP. Hồ Chí Minh
            </p>
            <button className="change-btn" onClick={() => setVisible(!visible)}>
              {" "}
              Change{" "}
            </button>
          </div>
        </div>
        <table class="w3-table w3-bordered" style={{ fontSize: "20px" }}>
          <tr>
            <th>Product</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>Amount</th>
          </tr>
          {products.map((product) => (
            <>
              <tr>
                <td className="checkout-left">
                  <img src={product.image} alt={product.name} />
                </td>
                <td style={{ textAlign: "center" }}>{product.price} $</td>
                <td style={{ textAlign: "center" }}>{product.count}</td>
                <td style={{ textAlign: "center" }}>
                  {product.price * product.count} $
                </td>
              </tr>
            </>
          ))}
        </table>
        <div className="checkout-footer">
          <b style={{ fontSize: "20px" }}>
            Total Price:
            {products
              .map((item) => item.price * item.count)
              .reduce((prev, next) => prev + next)}{" "}
            ${" "}
          </b>
          <button className="bill-btn" type="button">
            Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default Bill;
