import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getStudyResponses } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const StudyResponses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadResponses(); }, []);

  const loadResponses = async () => {
    try {
      const res = await getStudyResponses();
      setData(res.data);
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="studyresponses" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Study Responses</h1>
            <p className="page-subtitle">User participation and journal completion status</p>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">All responses ({data.length})</span>
            </div>
            {loading ? (
              <p className="state-text">Loading…</p>
            ) : data.length === 0 ? (
              <p className="state-text">No responses yet.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Primary</th>
                    <th>Secondary</th>
                    <th style={{ width: 110 }}>Journal entries</th>
                    <th style={{ width: 110 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.user._id}>
                      <td>{item.user.name}</td>
                      <td style={{ color: "#9A8070" }}>{item.user.email}</td>
                      <td>
                        {item.assessment?.primary
                          ? <span className={`badge badge-${item.assessment.primary.toLowerCase()}`}>{item.assessment.primary}</span>
                          : <span style={{ color: "#C0A88A" }}>—</span>}
                      </td>
                      <td>
                        {item.assessment?.secondary
                          ? <span className={`badge badge-${item.assessment.secondary.toLowerCase()}`}>{item.assessment.secondary}</span>
                          : <span style={{ color: "#C0A88A" }}>—</span>}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.journal_count}</td>
                      <td>
                        {item.journal_count >= 2
                          ? <span className="badge badge-success">Completed</span>
                          : <span className="badge badge-warning">Pending</span>}
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

export default StudyResponses;