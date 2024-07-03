import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const data = [
    {
      firstName: "wanchalerm",
      lastName: "yokam",
      email: "wanchalermyok@gosoft.co.th",
    },
  ];
  return (
    <section>
      <h2>User management</h2>

      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>

        {data.map((res) => {
          <tr>
            <td>{res.firstName}</td>
            <td>{res.lastName}</td>
            <td>{res.email}</td>
          </tr>;
        })}
      </table>
    </section>
  );
};

export default Admin;
