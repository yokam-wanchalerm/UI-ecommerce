import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useCommon from "../../hooks/useCommon";

const Product = () => {
  const { id } = useParams();
  const { cardItems, setCardItems } = useCommon();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const addProduct = (product) => {
    // Check product is exists
    const exist = cardItems.find((x) => x.id === product.id);
    if (exist) {
      // Increase Quantity
      const newResult = cardItems.map((x) =>
        x.id === product.id
          ? { ...x, qty: x.qty + 1, sub_total: (x.qty + 1) * x.price }
          : x
      );
      setCardItems(newResult);
    } else {
      const newResult = [
        ...cardItems,
        {
          ...product,
          qty: 1,
          sub_total: product.price,
        },
      ];
      setCardItems(newResult);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const url = `https://fakestoreapi.com/products/${id}`;
      console.log(url);
      const response = await fetch(url);
      console.log(response);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
    console.log("aa");
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating: {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">THB {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => {
              addProduct(product);
            }}
          >
            Add to cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </>
  );
};

export default Product;
