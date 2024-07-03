import React, { useState } from "react";
import TokenHelper from "../util/TokenHelper";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    TokenHelper.isAuthenticated()
  );
  const isAdmin = TokenHelper.isAdmin();
  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      TokenHelper.logout();
    }
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/">Authentication Dev</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/">Profile</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to="/admin/user-management">User Management</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
