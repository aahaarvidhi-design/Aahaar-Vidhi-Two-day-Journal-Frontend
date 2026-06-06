import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getCompletionReport } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => { loadReport(); }, []);

  const loadReport = async () => {
    try {
      const res = await getCompletionReport();
      setReport(res.data);
    } catch {}
  };

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="reports" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Study Report</h1>
            <p className="page-subtitle">Assessment completion overview</p>
          </div>

          {!report ? (
            <p className="state-text">Loading…</p>
          ) : (
            <div className="stat-grid">
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Total users</p>
                <p className="stat-card-value">{report.total_users}</p>
              </div>
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Completed users</p>
                <p className="stat-card-value">{report.completed_users}</p>
              </div>
              <div className="stat-card stat-card-accent">
                <p className="stat-card-label">Completion rate</p>
                <p className="stat-card-value">{report.completion_percentage}%</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Reports;