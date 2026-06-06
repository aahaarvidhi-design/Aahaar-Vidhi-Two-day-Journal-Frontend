import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getJournals, createJournal } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const Toast = ({ msg, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return <div className={`toast-bar toast-${type}`}>{msg}</div>;
};

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [form, setForm] = useState({ journal_name: "", journal_date: "" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { loadJournals(); }, []);

  const loadJournals = async () => {
    try {
      const res = await getJournals();
      setJournals(res.data);
    } catch {}
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.journal_name || !form.journal_date) return;
    setSubmitting(true);
    try {
      await createJournal(form);
      setForm({ journal_name: "", journal_date: "" });
      loadJournals();
      setToast({ msg: "Journal created", type: "success" });
    } catch {
      setToast({ msg: "Failed to create journal", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (raw) => {
    if (!raw) return "—";
    const d = new Date(raw);
    return isNaN(d) ? raw : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="journals" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Journals</h1>
            <p className="page-subtitle">Create and manage daily journal entries</p>
          </div>

          {/* Create form */}
          <div className="panel" style={{ marginBottom: 20 }}>
            <div className="panel-header">
              <span className="panel-title">Create journal</span>
            </div>
            <div className="panel-body">
              <div className="form-row">
                <div className="form-field" style={{ flex: 2 }}>
                  <label className="form-field-label">Journal name</label>
                  <input
                    type="text"
                    name="journal_name"
                    className="form-input"
                    placeholder="Morning Reflection"
                    value={form.journal_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field" style={{ maxWidth: 180 }}>
                  <label className="form-field-label">Date</label>
                  <input
                    type="date"
                    name="journal_date"
                    className="form-input"
                    value={form.journal_date}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Creating…" : "Create journal"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">All journals ({journals.length})</span>
            </div>
            {journals.length === 0 ? (
              <p className="state-text">No journals yet.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ width: 160 }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map((j) => (
                    <tr key={j._id}>
                      <td>{j.journal_name}</td>
                      <td style={{ color: "#9A8070" }}>{formatDate(j.journal_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </>
  );
};

export default Journals;