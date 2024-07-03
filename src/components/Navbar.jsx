import React from "react";
import { NavLink } from "react-router-dom";
import useCommon from "../hooks/useCommon";

const Navbar = () => {
  const { cardItems, profile } = useCommon();
  return (
    // <nav className="navbar navbar-expand-lg bg-white navbar-light bg-dark py-3 shadow-sm">
    //   <div className="container">
    //     <NavLink className="navbar-brand" to="/">
    //       Ecommerce
    //     </NavLink>
    //     <div className="navbar-nav">
    //       <NavLink className="nav-link active" aria-current="page" to="/">
    //         Home
    //       </NavLink>
    //       <NavLink className="nav-link" to="/products">
    //         Products
    //       </NavLink>
    //       <NavLink className="nav-link" to="/about">
    //         About
    //       </NavLink>
    //       <NavLink className="nav-link" to="/contact">
    //         Contact
    //       </NavLink>
    //       <div className="nav-link buttons topnav-right">
    //         {profile ? (
    //           <>
    //             <h3>{profile}</h3>
    //             <NavLink to="/logout" className="btn btn-outline-dark ms-2">
    //               <i className="fa fa-user-plus me-1"></i> Logout
    //             </NavLink>
    //           </>
    //         ) : (
    //           <>
    //             <NavLink to="/login" className="btn btn-outline-dark">
    //               <i className="fa fa-sign-in me-1"></i> Login
    //             </NavLink>
    //             <NavLink to="/register" className="btn btn-outline-dark ms-2">
    //               <i className="fa fa-user-plus me-1"></i> Register
    //             </NavLink>
    //           </>
    //         )}

    //         <NavLink to="/cart" className="btn btn-outline-dark ms-2">
    //           <i className="fa fa-shopping-cart me-1"></i> Cart (
    //           {cardItems.length})
    //         </NavLink>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
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
            <li class="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <form class="d-flex">
            {profile ? (
              <>
                <span class="navbar-text">{profile}</span>
                <NavLink to="/logout" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-user-plus me-1"></i> Logout
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
