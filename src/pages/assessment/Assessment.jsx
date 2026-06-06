import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions, submitAssessment } from "../../api/assessmentApi";
import QuestionCard from "../../components/assessment/QuestionCard";
import Navbar from "../../components/common/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  .assess-root {
    min-height: 100vh;
    background: #F7F3EE;
    font-family: 'DM Sans', sans-serif;
  }

  .assess-body {
    max-width: 680px;
    margin: 0 auto;
    padding: 1.5rem 1rem 120px;
  }

  .assess-header {
    margin-bottom: 1.5rem;
  }

  .assess-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: #1E110A;
    margin-bottom: 4px;
  }

  .assess-subtitle {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
  }

  /* Progress */
  .progress-wrap {
    margin-bottom: 1.75rem;
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
  }

  .progress-label {
    font-size: 12px;
    font-weight: 500;
    color: #9A8070;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .progress-pct {
    font-size: 12px;
    font-weight: 500;
    color: #C9902A;
  }

  .progress-track {
    height: 4px;
    background: #EDE4D8;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #C9902A;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Mobile stepper */
  .mobile-counter {
    font-size: 13px;
    font-weight: 400;
    color: #9A8070;
    margin-bottom: 12px;
  }

  .mobile-counter span {
    font-weight: 500;
    color: #1E110A;
  }

  .nav-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 16px;
  }

  .nav-btn {
    height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    border: 1px solid #E0D4C4;
    background: #fff;
    color: #1E110A;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.12s;
  }

  .nav-btn:hover { background: #F0E8DC; }
  .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  /* Submit */
  .submit-btn {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: none;
    background: #1E110A;
    color: #F5E6C8;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.2px;
  }

  .submit-btn:hover { background: #3A2010; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Error banner */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: #FEF0F0;
    border: 0.5px solid #F5BABA;
    border-radius: 8px;
    font-size: 13px;
    color: #A03030;
    margin-top: 12px;
  }

  /* Loading */
  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    font-size: 14px;
    font-weight: 300;
    color: #9A8070;
    font-family: 'DM Sans', sans-serif;
  }
`;

const Assessment = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isMobile = window.innerWidth < 768;

  useEffect(() => { fetchQuestions(); }, []);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions();
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionNo, value) => {
    const updatedAnswers = { ...answers, [questionNo]: value };
    setAnswers(updatedAnswers);
    setError("");
    localStorage.setItem("assessment_answers", JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError(`Please answer all questions — ${questions.length - Object.keys(answers).length} remaining.`);
      return;
    }
    setSubmitting(true);
    try {
      const orderedAnswers = questions.map((q) => answers[q.question_no]);
      const res = await submitAssessment(orderedAnswers);
      localStorage.setItem("assessmentResult", JSON.stringify(res.data));
      navigate("/result");
    } catch {
      setError("Failed to submit assessment. Please try again.");
      setSubmitting(false);
    }
  };

  const answered = Object.keys(answers).length;
  const progress = questions.length ? (answered / questions.length) * 100 : 0;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="assess-root">
          <Navbar />
          <div className="loading-state">Loading questions…</div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="assess-root">
        <Navbar />
        <div className="assess-body">
          <div className="assess-header">
            <h1 className="assess-title">Know Your Body Constitution</h1>
            <p className="assess-subtitle">Answer each question honestly based on your lifelong tendencies</p>
          </div>

          <div className="progress-wrap">
            <div className="progress-meta">
              <span className="progress-label">{answered} of {questions.length} answered</span>
              <span className="progress-pct">{Math.round(progress)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {isMobile ? (
            <>
              <p className="mobile-counter">
                Question <span>{currentQuestion + 1}</span> of <span>{questions.length}</span>
              </p>

              <QuestionCard
                question={questions[currentQuestion]}
                answer={answers[questions[currentQuestion]?.question_no]}
                onAnswer={handleAnswer}
              />

              <div className="nav-row">
                <button
                  className="nav-btn"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  ← Previous
                </button>
                <button
                  className="nav-btn"
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            questions.map((question) => (
              <QuestionCard
                key={question.question_no}
                question={question}
                answer={answers[question.question_no]}
                onAnswer={handleAnswer}
              />
            ))
          )}

          {error && <div className="error-banner">⚠ {error}</div>}

          <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit assessment →"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Assessment;