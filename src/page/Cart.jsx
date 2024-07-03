// import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartProduct from "./cart/CartProduct";
import useCommon from "../hooks/useCommon";

const Cart = () => {
  const { cardItems } = useCommon();
  let total = 0;
  return (
    <div className="cartContainer container">
      <div className="row">
        <div className="col-md-6">
          {cardItems?.map((cartProduct) => {
            return <CartProduct cartProduct={cartProduct} />;
          })}
          {cardItems.length === 0 && (
            <div className="emptyCart container text-center">
              <h1 className="row heading m-3 text-center">
                {" "}
                Your Cart is Empty...!
              </h1>
              <div className="row text-center">
                <Link to="/products" className="btn btn-large btn-primary">
                  Start Shopping...
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6 statusContainer">
          <h2>Cart Status</h2>
          {cardItems.map((x) => {
            total += x.sub_total;
          })}
          <div className="total"> THB {parseFloat(total).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
