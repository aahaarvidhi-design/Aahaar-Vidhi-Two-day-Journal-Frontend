const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-root {
    display: flex;
    min-height: 100vh;
    background: #F7F3EE;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Sidebar ── */
  .admin-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #1E110A;
    display: flex;
    flex-direction: column;
    padding: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1.5rem 1.25rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .sidebar-brand-icon {
    width: 30px; height: 30px;
    border-radius: 6px;
    background: #C9902A;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .sidebar-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    color: #F5E6C8;
  }

  .sidebar-section {
    padding: 1rem 0.75rem 0.5rem;
  }

  .sidebar-section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #6A4A30;
    padding: 0 0.5rem;
    margin-bottom: 4px;
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 400;
    color: #A08060;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    margin-bottom: 2px;
  }

  .sidebar-link:hover {
    background: rgba(255,255,255,0.05);
    color: #F5E6C8;
  }

  .sidebar-link.active {
    background: rgba(201,144,42,0.18);
    color: #F5E6C8;
  }

  .sidebar-link-icon { font-size: 16px; flex-shrink: 0; }

  /* ── Main content ── */
  .admin-main {
    flex: 1;
    min-width: 0;
    padding: 2rem 2rem 3rem;
    overflow-x: auto;
  }

  .page-header {
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #EDE4D8;
  }

  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 500;
    color: #1E110A;
  }

  .page-subtitle {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    margin-top: 2px;
  }

  /* ── Stat cards ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: #fff;
    border: 1px solid #EDE4D8;
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
  }

  .stat-card-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #9A8070;
    margin-bottom: 8px;
  }

  .stat-card-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 500;
    color: #1E110A;
    line-height: 1;
  }

  .stat-card-accent {
    border-left: 3px solid #C9902A;
  }

  /* ── Panel card ── */
  .panel {
    background: #fff;
    border: 1px solid #EDE4D8;
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .panel-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #EDE4D8;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-title {
    font-size: 14px;
    font-weight: 500;
    color: #1E110A;
  }

  .panel-body {
    padding: 1.25rem;
  }

  /* ── Form row ── */
  .form-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
    min-width: 120px;
  }

  .form-field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: #9A8070;
  }

  .form-input {
    height: 38px;
    padding: 0 12px;
    border: 1px solid #E0D4C4;
    border-radius: 7px;
    background: #FDFAF7;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #1E110A;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
  }

  .form-input:focus {
    border-color: #C9902A;
    box-shadow: 0 0 0 3px rgba(201,144,42,0.1);
  }

  .form-select {
    height: 38px;
    padding: 0 12px;
    border: 1px solid #E0D4C4;
    border-radius: 7px;
    background: #FDFAF7;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #1E110A;
    outline: none;
    appearance: none;
    cursor: pointer;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .form-select:focus {
    border-color: #C9902A;
    box-shadow: 0 0 0 3px rgba(201,144,42,0.1);
  }

  /* ── Buttons ── */
  .btn-primary {
    height: 38px;
    padding: 0 18px;
    border-radius: 7px;
    border: none;
    background: #1E110A;
    color: #F5E6C8;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, transform 0.1s;
  }

  .btn-primary:hover { background: #3A2010; }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

  .btn-danger {
    height: 30px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #F5BABA;
    background: #FEF0F0;
    color: #A03030;
    font-size: 12px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.12s;
  }

  .btn-danger:hover { background: #FDDADA; }

  /* ── Table ── */
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .data-table thead tr {
    border-bottom: 1px solid #EDE4D8;
  }

  .data-table thead th {
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: #9A8070;
    text-align: left;
    white-space: nowrap;
  }

  .data-table tbody tr {
    border-bottom: 1px solid #F5EFE8;
    transition: background 0.1s;
  }

  .data-table tbody tr:last-child { border-bottom: none; }
  .data-table tbody tr:hover { background: #FDFAF7; }

  .data-table td {
    padding: 11px 14px;
    color: #3A2010;
    vertical-align: middle;
  }

  /* ── Badges ── */
  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }

  .badge-success { background: #E8F8F2; color: #0F6E56; border: 1px solid #A8DDB8; }
  .badge-warning { background: #FDF3E3; color: #8B5A00; border: 1px solid #F0C97A; }
  .badge-vata    { background: #EBF0FA; color: #2A4A8A; border: 1px solid #B0C4E8; }
  .badge-pitta   { background: #FDF0E8; color: #8A3A10; border: 1px solid #F0B090; }
  .badge-kapha   { background: #E8F5EE; color: #1A5A38; border: 1px solid #90D0A8; }

  /* ── Loading / empty ── */
  .state-text {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    padding: 1.5rem 0;
    text-align: center;
  }

  /* ── Toast / inline feedback ── */
  .toast-bar {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    z-index: 9999;
    animation: slideUp 0.2s ease;
  }

  .toast-success { background: #1E110A; color: #F5E6C8; }
  .toast-error   { background: #A03030; color: #fff; }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .confirm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(30,17,10,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .confirm-box {
    background: #fff;
    border-radius: 12px;
    padding: 1.75rem;
    width: 340px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }

  .confirm-title {
    font-size: 16px;
    font-weight: 500;
    color: #1E110A;
    margin-bottom: 8px;
  }

  .confirm-sub {
    font-size: 13px;
    font-weight: 300;
    color: #9A8070;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .btn-ghost {
    height: 36px;
    padding: 0 16px;
    border-radius: 7px;
    border: 1px solid #E0D4C4;
    background: #F7F3EE;
    color: #6A4A30;
    font-size: 13px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }

  .btn-ghost:hover { background: #EDE4D8; }
`;

export default adminStyles;