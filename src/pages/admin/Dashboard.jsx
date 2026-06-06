import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getDashboard } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setStats(res.data);
    } catch {}
  };

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="dashboard" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Overview of platform activity</p>
          </div>

          {!stats ? (
            <p className="state-text">Loading…</p>
          ) : (
            <div className="stat-grid">
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Total users</p>
                <p className="stat-card-value">{stats.total_users}</p>
              </div>
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Assessments</p>
                <p className="stat-card-value">{stats.total_assessments}</p>
              </div>
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Journal entries</p>
                <p className="stat-card-value">{stats.total_journal_entries}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;