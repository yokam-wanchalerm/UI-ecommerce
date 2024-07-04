import React from "react";
import useCommon from "../../hooks/useCommon";
const CartProduct = ({ cartProduct }) => {
  const { cardItems, setCardItems } = useCommon();

  const handleRemove = () => {
    const exist2 = cardItems.find((x) => x.id === cartProduct.id);
    if (exist2) {
      const newResult = cardItems.filter((x) => x.id !== exist2.id);
      setCardItems(newResult);
    }
  };

  const handleReduce = (e) => {
    const exist1 = cardItems.find((x) => x.id === cartProduct.id);
    if (exist1.qty === 1) {
      const newResult = cardItems.filter((x) => x.id !== exist1.id);
      setCardItems(newResult);
    } else {
      const newResult = cardItems.map((x) =>
        x.id === cartProduct.id
          ? { ...x, qty: x.qty - 1, sub_total: (x.qty - 1) * x.price }
          : x
      );
      setCardItems(newResult);
    }
  };

  const handleAdd = () => {
    const exist = cardItems.find((x) => x.id === cartProduct.id);
    if (exist) {
      const newResult = cardItems.map((x) =>
        x.id === cartProduct.id
          ? { ...x, qty: x.qty + 1, sub_total: (x.qty + 1) * x.price }
          : x
      );
      setCardItems(newResult);
    } else {
      const newResult = [
        ...cardItems,
        {
          ...cartProduct,
          qty: 1,
          sub_total: cartProduct.price,
        },
      ];
      setCardItems(newResult);
    }
  };

  return (
    <div class="container">
      <div className="cartProductContainer row">
        <img
          src={cartProduct.image}
          className="img-fluid col-3 p-2"
          alt={cartProduct.title}
        />
        <div className="cartProductDescription col-7 p-2">
          <p>{cartProduct.title}</p>
          <p>
            Quantity:
            <br />
            <button className="btn btn-light" onClick={handleReduce}>
              -
            </button>
            <span> {cartProduct.qty}</span>{" "}
            <button className="btn btn-light" onClick={handleAdd}>
              +
            </button>
          </p>
          <p>Item - Price: THB {cartProduct.price}</p>
          <p>Sub - Total: THB {cartProduct.sub_total}</p>
        </div>
        <div
          className="col-md-2 d-flex p-2"
          style={{ flexDirection: "column", justifyContent: "space-around" }}
        >
          <button className="btn btn-outline-danger" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
