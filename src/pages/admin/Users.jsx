import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getUsers } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const ROLE_STYLE = {
  admin: { background: "#FDF3E3", color: "#8B5A00", border: "1px solid #F0C97A" },
  user:  { background: "#F5F3FF", color: "#4A3A8A", border: "1px solid #C4B8F0" },
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {}
    finally { setLoading(false); }
  };

  const initials = (name = "") =>
    name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="users" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Users</h1>
            <p className="page-subtitle">All registered accounts</p>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">All users ({users.length})</span>
            </div>
            {loading ? (
              <p className="state-text">Loading…</p>
            ) : users.length === 0 ? (
              <p className="state-text">No users yet.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th style={{ width: 90 }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "#EDE4D8", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 500, color: "#6A4A30",
                            flexShrink: 0,
                          }}>
                            {initials(user.name)}
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td style={{ color: "#9A8070" }}>{user.email}</td>
                      <td style={{ color: "#9A8070" }}>{user.city || "—"}</td>
                      <td>
                        <span className="badge" style={ROLE_STYLE[user.role] || ROLE_STYLE.user}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Users;