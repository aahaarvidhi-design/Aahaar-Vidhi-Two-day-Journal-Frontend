import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import BottomNavigation from "../components/common/BottomNavigation";

import { getLatestAssessment } from "../api/assessmentApi";
import { getCurrentJournal } from "../api/journalApi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  .home-root {
    min-height: 100vh;
    background: #F7F3EE;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
  }

  .home-body {
    flex: 1;
    padding: 1.25rem 1rem 100px;
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .greeting {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 4px;
  }

  .greeting-text h2 {
    font-size: 22px;
    font-weight: 500;
    color: #1E110A;
  }

  .greeting-text p {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    margin-top: 2px;
  }

  .section-title {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #9A8070;
    margin-bottom: 8px;
  }

  /* Constitution card */
  .constitution-card {
    background: #1E110A;
    border-radius: 14px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .constitution-card::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: #6B3A1F;
    opacity: 0.35;
    pointer-events: none;
  }

  .constitution-card::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: #C9902A;
    opacity: 0.12;
    pointer-events: none;
  }

  .card-eyebrow {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #9A7A5A;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }

  .card-primary-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: #F5E6C8;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
    line-height: 1.2;
  }

  .card-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 8px;
    border: none;
    background: #C9902A;
    color: #1E110A;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: background 0.15s, transform 0.1s;
  }

  .card-action-btn:hover { background: #E0A030; }
  .card-action-btn:active { transform: scale(0.98); }

  .card-action-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 8px;
    border: 1px solid rgba(245,230,200,0.25);
    background: transparent;
    color: #F5E6C8;
    font-size: 13px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: border-color 0.15s, background 0.15s;
  }

  .card-action-btn-outline:hover {
    background: rgba(245,230,200,0.08);
    border-color: rgba(245,230,200,0.4);
  }

  /* Plain card */
  .plain-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #EDE4D8;
    padding: 1.25rem;
  }

  .plain-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .card-icon-box {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .icon-amber { background: #FDF3E3; }
  .icon-teal  { background: #E8F8F2; }

  .plain-card-title {
    font-size: 15px;
    font-weight: 500;
    color: #1E110A;
  }

  .plain-card-sub {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    margin-top: 1px;
  }

  .plain-card-body {
    font-size: 14px;
    font-weight: 300;
    color: #6A5040;
    line-height: 1.55;
    margin-bottom: 12px;
  }

  .plain-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #E0D4C4;
    background: #F7F3EE;
    color: #1E110A;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .plain-btn:hover { background: #EDE4D8; border-color: #D4C4B0; }

  .empty-text {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
  }

  .divider {
    height: 1px;
    background: #EDE4D8;
    margin: 4px 0 14px;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [journals, setJournals] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const assessmentRes = await getLatestAssessment();
      setAssessment(assessmentRes.data);
    } catch {}

    try {
      const journalRes = await getCurrentJournal();
      setJournals(journalRes.data);
    } catch {}
  };

  return (
    <>
      <style>{styles}</style>
      <div className="home-root">
        <Navbar />

        <div className="home-body">

          <div className="greeting">
            <div className="greeting-text">
              <h2>Hello 👋</h2>
            </div>
          </div>

          {/* Body Constitution */}
          <div>
            <p className="section-title">Body Constitution</p>
            <div className="constitution-card">
              {assessment ? (
                <>
                  <p className="card-eyebrow">Your Prakriti</p>
                  <p className="card-primary-text">{assessment.primary}</p>
                  <button
                    className="card-action-btn"
                    onClick={() => navigate("/result")}
                  >
                    View result →
                  </button>
                </>
              ) : (
                <>
                  <p className="card-eyebrow">Not assessed yet</p>
                  <p className="card-primary-text">Discover your body type</p>
                  <button
                    className="card-action-btn"
                    onClick={() => navigate("/assessment")}
                  >
                    Start assessment →
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Today's Journal */}
          <div>
            <p className="section-title">Today's Journal</p>
            <div className="plain-card">
              <div className="plain-card-header">
                <div className="card-icon-box icon-amber">📓</div>
                <div>
                  <p className="plain-card-title">
                    {journals && journals.length > 0 ? journals[0].journal_name : "No journal available"}
                  </p>
                  {journals && journals.length > 0 && (
                    <p className="plain-card-sub">Today's reflection</p>
                  )}
                </div>
              </div>

              {
                journals.length > 0 ? (

                  journals.map(journal => (

                    <div
                      key={journal._id}
                      className="mb-3"
                    >

                      <div className="plain-card-header">

                        <div className="card-icon-box icon-amber">
                          📓
                        </div>

                        <div>

                          <p className="plain-card-title">
                            {journal.journal_name}
                          </p>

                          <p className="plain-card-sub">
                            Today's reflection
                          </p>

                        </div>

                      </div>

                      <button
                        className="plain-btn"
                        onClick={() =>
                          navigate(
                            `/journal/questions/${journal._id}`
                          )
                        }
                      >
                        Start journal →
                      </button>

                    </div>

                  ))

                ) : (

                  <p className="empty-text">
                    No journal available today.
                  </p>

                )
              }
            </div>
          </div>

        </div>

        <BottomNavigation />
      </div>
    </>
  );
};

export default Home;