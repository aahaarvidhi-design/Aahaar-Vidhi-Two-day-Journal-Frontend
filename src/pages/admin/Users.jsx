import { useEffect, useState } from "react";

import AdminSidebar
from "../../components/common/AdminSidebar";

import {
  getUsers
} from "../../api/adminApi";

const Users = () => {

  const [users,setUsers] =
    useState([]);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers =
    async () => {

      const res =
        await getUsers();

      setUsers(
        res.data
      );
    };

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Users
          </h2>

          <table className="table table-bordered mt-3">

            <thead>

              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>

              </tr>

            </thead>

            <tbody>

              {
                users.map(
                  user => (

                    <tr
                      key={user._id}
                    >

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.city}
                      </td>

                      <td>
                        {user.role}
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;