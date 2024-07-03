import React from "react";
import Products from "./product/Products";
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";

const Home = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide border-0">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100" alt="banner 1" />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="banner 2" />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="banner 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Products />
    </>
  );
};

export default Home;
