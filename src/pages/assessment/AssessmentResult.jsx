import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestAssessment } from "../../api/assessmentApi";
import Navbar from "../../components/common/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  .result-root {
    min-height: 100vh;
    background: #F7F3EE;
    font-family: 'DM Sans', sans-serif;
    padding-bottom: 80px;
  }

  .result-body {
    max-width: 560px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  /* Hero constitution card */
  .constitution-hero {
    background: #1E110A;
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    text-align: center;
  }

  .constitution-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: #6B3A1F;
    opacity: 0.3;
    pointer-events: none;
  }

  .constitution-hero::after {
    content: '';
    position: absolute;
    bottom: -50px; left: -50px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: #C9902A;
    opacity: 0.12;
    pointer-events: none;
  }

  .hero-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #9A7A5A;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .hero-primary {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 500;
    color: #F5E6C8;
    line-height: 1;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }

  .hero-primary-label {
    font-size: 12px;
    font-weight: 400;
    color: #9A7A5A;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .hero-divider {
    width: 40px;
    height: 1px;
    background: rgba(245,230,200,0.15);
    margin: 0 auto 20px;
    position: relative;
    z-index: 1;
  }

  .hero-secondary {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #C9902A;
    line-height: 1;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
  }

  .hero-secondary-label {
    font-size: 12px;
    font-weight: 300;
    color: #9A7A5A;
    position: relative;
    z-index: 1;
  }

  /* Score cards */
  .score-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .score-card {
    background: #fff;
    border: 1px solid #EDE4D8;
    border-radius: 12px;
    padding: 1.1rem 1rem;
    text-align: center;
  }

  .score-card-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .label-vata  { color: #2A4A8A; }
  .label-pitta { color: #8A3A10; }
  .label-kapha { color: #1A5A38; }

  .score-card-bar-wrap {
    height: 4px;
    border-radius: 2px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .bar-vata  { background: #E0E8F8; }
  .bar-pitta { background: #F8EBE0; }
  .bar-kapha { background: #E0F2EA; }

  .score-card-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.6s ease;
  }

  .fill-vata  { background: #5A7AB8; }
  .fill-pitta { background: #C07040; }
  .fill-kapha { background: #3A9A68; }

  .score-card-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 500;
    color: #1E110A;
    line-height: 1;
  }

  /* CTA */
  .cta-btn {
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.2px;
  }

  .cta-btn:hover { background: #3A2010; }
  .cta-btn:active { transform: scale(0.99); }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 12px;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
  }

  .empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 500;
    color: #1E110A;
  }

  .empty-sub {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
  }
`;

const AssessmentResult = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await getLatestAssessment();
        setResult(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResult();
  }, []);

  const maxScore = result
    ? Math.max(result.vata_score, result.pitta_score, result.kapha_score)
    : 1;

  const barWidth = (score) => Math.round((score / maxScore) * 100);

  if (!result) {
    return (
      <>
        <style>{styles}</style>
        <div className="result-root">
          <Navbar />
          <div className="result-body">
            <div className="empty-state">
              <p className="empty-title">No result found</p>
              <p className="empty-sub">Complete the assessment to see your body constitution.</p>
              <button className="cta-btn" style={{ width: "auto", padding: "0 24px" }} onClick={() => navigate("/assessment")}>
                Take assessment →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="result-root">
        <Navbar />
        <div className="result-body">

          <div className="constitution-hero">
            <p className="hero-eyebrow">Your Prakriti</p>
            <p className="hero-primary">{result.primary}</p>
            <p className="hero-primary-label">Primary constitution</p>

            {result.secondary && (
              <>
                <div className="hero-divider" />
                <p className="hero-secondary">{result.secondary}</p>
                <p className="hero-secondary-label">Secondary constitution</p>
              </>
            )}
          </div>

          <div className="score-grid">
            <div className="score-card">
              <p className="score-card-label label-vata">Vata</p>
              <div className={`score-card-bar-wrap bar-vata`}>
                <div className="score-card-bar-fill fill-vata" style={{ width: `${barWidth(result.vata_score)}%` }} />
              </div>
              <p className="score-card-value">{result.vata_score}</p>
            </div>
            <div className="score-card">
              <p className="score-card-label label-pitta">Pitta</p>
              <div className={`score-card-bar-wrap bar-pitta`}>
                <div className="score-card-bar-fill fill-pitta" style={{ width: `${barWidth(result.pitta_score)}%` }} />
              </div>
              <p className="score-card-value">{result.pitta_score}</p>
            </div>
            <div className="score-card">
              <p className="score-card-label label-kapha">Kapha</p>
              <div className={`score-card-bar-wrap bar-kapha`}>
                <div className="score-card-bar-fill fill-kapha" style={{ width: `${barWidth(result.kapha_score)}%` }} />
              </div>
              <p className="score-card-value">{result.kapha_score}</p>
            </div>
          </div>

          <button className="cta-btn" onClick={() => navigate("/journal")}>
            Start journal →
          </button>

        </div>
      </div>
    </>
  );
};

export default AssessmentResult;