import React from "react";
import { NavLink } from "react-router-dom";
import useCommon from "../hooks/useCommon";
import TokenHelper from "../util/TokenHelper";

const Navbar = () => {
  const { cardItems, profile } = useCommon();
  const isAdmin = () => {
    return !!(
      TokenHelper.parseJwt(localStorage.getItem("token"))?.role === "ADMIN"
    );
  };
  return (
    <nav class="navbar navbar-expand-lg bg-white navbar-light bg-dark py-3 shadow-sm">
      <div class="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Ecommerce
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li class="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
          </ul>
          <form class="d-flex">
            {profile ? (
              <>
                <h5 class="navbar-text" style={{ marginBottom: "0px" }}>
                  {profile}
                </h5>
                {isAdmin() && (
                  <NavLink to="/users" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-sign-in me-1"></i> Manage User
                  </NavLink>
                )}

                <NavLink to="/logout" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-sign-out me-1"></i> Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-dark ms-2">
              <i className="fa fa-shopping-cart me-1"></i> Cart (
              {cardItems.length})
            </NavLink>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
