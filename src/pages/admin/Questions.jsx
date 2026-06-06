import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { getQuestions, addQuestion, deleteQuestion } from "../../api/adminApi";
import adminStyles from "./adminStyles";

const GROUP_BADGE = {
  Vata: "badge badge-vata",
  Pitta: "badge badge-pitta",
  Kapha: "badge badge-kapha",
};

const Toast = ({ msg, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return <div className={`toast-bar toast-${type}`}>{msg}</div>;
};

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-overlay" onClick={onCancel}>
    <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
      <p className="confirm-title">Confirm delete</p>
      <p className="confirm-sub">{message}</p>
      <div className="confirm-actions">
        <button className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ question_no: "", question: "", group: "Vata" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => { fetchQuestions(); }, []);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions();
      setQuestions(res.data);
    } catch {}
    finally { setLoading(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.question_no || !form.question) return;
    setSubmitting(true);
    try {
      await addQuestion({
        question_no: Number(form.question_no),
        question: form.question,
        group: form.group,
      });
      setForm({ question_no: "", question: "", group: "Vata" });
      fetchQuestions();
      setToast({ msg: "Question added", type: "success" });
    } catch {
      setToast({ msg: "Failed to add question", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(confirmId);
      setConfirmId(null);
      fetchQuestions();
      setToast({ msg: "Question deleted", type: "success" });
    } catch {
      setToast({ msg: "Delete failed", type: "error" });
    }
  };

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <AdminSidebar active="questions" />

        <main className="admin-main">
          <div className="page-header">
            <h1 className="page-title">Assessment Questions</h1>
            <p className="page-subtitle">Manage the Prakriti assessment question bank</p>
          </div>

          {/* Add form */}
          <div className="panel" style={{ marginBottom: 20 }}>
            <div className="panel-header">
              <span className="panel-title">Add question</span>
            </div>
            <div className="panel-body">
              <div className="form-row">
                <div className="form-field" style={{ maxWidth: 110 }}>
                  <label className="form-field-label">No.</label>
                  <input
                    type="number"
                    name="question_no"
                    className="form-input"
                    placeholder="1"
                    value={form.question_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field" style={{ flex: 3 }}>
                  <label className="form-field-label">Question</label>
                  <input
                    type="text"
                    name="question"
                    className="form-input"
                    placeholder="Enter the question text"
                    value={form.question}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field" style={{ maxWidth: 130 }}>
                  <label className="form-field-label">Group</label>
                  <select
                    name="group"
                    className="form-select"
                    value={form.group}
                    onChange={handleChange}
                  >
                    <option value="Vata">Vata</option>
                    <option value="Pitta">Pitta</option>
                    <option value="Kapha">Kapha</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Adding…" : "Add question"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Questions ({questions.length})</span>
            </div>
            {loading ? (
              <p className="state-text">Loading…</p>
            ) : questions.length === 0 ? (
              <p className="state-text">No questions yet.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>No.</th>
                    <th>Question</th>
                    <th style={{ width: 100 }}>Group</th>
                    <th style={{ width: 90 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q._id}>
                      <td style={{ color: "#9A8070" }}>{q.question_no}</td>
                      <td>{q.question}</td>
                      <td>
                        <span className={GROUP_BADGE[q.group] || "badge"}>
                          {q.group}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => setConfirmId(q._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {confirmId && (
        <ConfirmDialog
          message="This question will be permanently removed from the assessment."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </>
  );
};

export default Questions;