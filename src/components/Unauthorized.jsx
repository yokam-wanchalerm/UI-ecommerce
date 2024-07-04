import React from "react";
import { Link } from "react-router-dom";
import i401 from "../assets/image/401.jpg";

const Unauthorized = () => {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center row">
        <div class=" col-md-6">
          <img src={i401} alt="" class="img-fluid" />
        </div>
        <div class=" col-md-6 mt-5">
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Unauthorized
          </p>
          <p class="lead">You do not have access to the requested page.</p>
          <Link class="btn btn-primary" to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
