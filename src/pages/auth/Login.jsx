import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    background: #F7F3EE;
    font-family: 'DM Sans', sans-serif;
  }

  .auth-left {
    width: 420px;
    flex-shrink: 0;
    background: #1E110A;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .auth-left-blob1 {
    position: absolute;
    top: -80px; right: -80px;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: #6B3A1F;
    opacity: 0.3;
    pointer-events: none;
  }

  .auth-left-blob2 {
    position: absolute;
    bottom: -60px; left: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: #C9902A;
    opacity: 0.15;
    pointer-events: none;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .brand-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: #C9902A;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: #F5E6C8;
    letter-spacing: 0.5px;
  }

  .left-body {
    position: relative;
    z-index: 1;
  }

  .left-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 500;
    color: #F5E6C8;
    line-height: 1.25;
    margin-bottom: 12px;
  }

  .left-sub {
    font-size: 14px;
    font-weight: 300;
    color: #9A7A5A;
    line-height: 1.65;
  }

  .dosha-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .dosha-chip {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 400;
    border: 0.5px solid;
    letter-spacing: 0.2px;
  }

  .chip-vata { background: rgba(100,140,220,0.12); color: #8FAED4; border-color: rgba(100,140,220,0.25); }
  .chip-pitta { background: rgba(210,100,45,0.12); color: #D4957A; border-color: rgba(210,100,45,0.25); }
  .chip-kapha { background: rgba(70,160,120,0.12); color: #6BB89A; border-color: rgba(70,160,120,0.25); }

  .auth-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .auth-box {
    width: 100%;
    max-width: 400px;
  }

  .auth-box-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 500;
    color: #1E110A;
    margin-bottom: 4px;
  }

  .auth-box-sub {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    margin-bottom: 28px;
  }

  .error-box {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: #FEF0F0;
    border: 0.5px solid #F5BABA;
    border-radius: 8px;
    font-size: 13px;
    color: #A03030;
    margin-bottom: 18px;
  }

  .field {
    margin-bottom: 16px;
  }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #9A8070;
    margin-bottom: 6px;
  }

  .field-wrap {
    position: relative;
  }

  .field-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #C0A88A;
    pointer-events: none;
  }

  .field-input {
    width: 100%;
    height: 44px;
    padding: 0 14px 0 38px;
    border: 1px solid #E0D4C4;
    border-radius: 8px;
    background: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #1E110A;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .field-input:focus {
    border-color: #C9902A;
    box-shadow: 0 0 0 3px rgba(201,144,42,0.12);
  }

  .eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #C0A88A;
    padding: 0;
    line-height: 1;
  }

  .submit-btn {
    width: 100%;
    height: 46px;
    border-radius: 8px;
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
    margin-top: 8px;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.2px;
  }

  .submit-btn:hover { background: #3A2010; }
  .submit-btn:active { transform: scale(0.99); }

  .form-footer {
    margin-top: 18px;
    text-align: center;
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
  }

  .form-link {
    color: #C9902A;
    font-weight: 500;
    text-decoration: none;
  }

  .form-link:hover { text-decoration: underline; }

  @media (max-width: 700px) {
    .auth-left { display: none; }
    .auth-root { background: #fff; }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.role);
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-left">
          <div className="auth-left-blob1" />
          <div className="auth-left-blob2" />

          <div className="brand">
            <div className="brand-icon">🌿</div>
            <span className="brand-name">Prakriti</span>
          </div>

          <div className="left-body">
            <p className="left-heading">Understand your body's ancient wisdom</p>
            <p className="left-sub">
              Discover your Ayurvedic constitution, get personalised insights,
              and align your daily life with your dosha.
            </p>
          </div>

          <div className="dosha-row">
            <span className="dosha-chip chip-vata">🌬 Vata</span>
            <span className="dosha-chip chip-pitta">🔥 Pitta</span>
            <span className="dosha-chip chip-kapha">💧 Kapha</span>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-box">
            <p className="auth-box-title">Welcome back</p>
            <p className="auth-box-sub">Sign in to continue your Prakriti journey</p>

            {error && (
              <div className="error-box">
                ⚠ {error}
              </div>
            )}

            <div className="field">
              <label className="field-label">Email</label>
              <div className="field-wrap">
                <span className="field-icon">✉</span>
                <input
                  type="email"
                  name="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="field-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  className="eye-btn"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  type="button"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Signing in…" : "Sign in →"}
            </button>

            <p className="form-footer">
              Don't have an account?{" "}
              <Link to="/register" className="form-link">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;