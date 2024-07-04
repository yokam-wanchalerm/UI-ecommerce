import React from "react";
import { Link } from "react-router-dom";
import i404 from "../assets/image/404.jpg";

const Missing = () => {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center row">
        <div class=" col-md-6">
          <img src={i404} alt="" class="img-fluid" />
        </div>
        <div class=" col-md-6 mt-5">
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Page not found.
          </p>
          <p class="lead">The page you’re looking for doesn’t exist.</p>
          <Link class="btn btn-primary" to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Missing;
