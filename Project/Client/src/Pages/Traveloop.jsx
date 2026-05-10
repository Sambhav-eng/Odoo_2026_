import { useState } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_TRIPS = [
  {
    id: 1,
    name: "Golden Triangle India",
    startDate: "2025-03-10",
    endDate: "2025-03-22",
    description: "Delhi, Agra and Jaipur – the classic royal circuit.",
    stops: ["Delhi", "Agra", "Jaipur"],
    budget: 85000,
    spent: 42000,
    status: "upcoming",
    cover: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
  },
  {
    id: 2,
    name: "Southeast Asia Backpack",
    startDate: "2025-01-05",
    endDate: "2025-01-28",
    description: "Bangkok, Chiang Mai, Hanoi, Hội An and Bali.",
    stops: ["Bangkok", "Chiang Mai", "Hanoi", "Hội An", "Bali"],
    budget: 120000,
    spent: 118400,
    status: "completed",
    cover: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  },
  { 
    id: 3,
    name: "Portugal Road Trip",
    startDate: "2025-06-01",
    endDate: "2025-06-14",
    description: "Lisbon, Sintra, Porto and Douro Valley.",
    stops: ["Lisbon", "Sintra", "Porto"],
    budget: 200000,
    spent: 0,
    status: "upcoming",
    cover: "https://images.unsplash.com/photo-1513735492246-483525079686?w=600&q=80",
  },
];

const MOCK_DESTINATIONS = [
  { name: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80", tag: "Culture" },
  { name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1507501336603-6a365d4e1c85?w=400&q=80", tag: "Beach" },
  { name: "Patagonia", country: "Argentina", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", tag: "Adventure" },
  { name: "Marrakech", country: "Morocco", img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80", tag: "Explore" },
];

const MOCK_STOPS = [
  { id: 1, city: "Paris", startDate: "2025-03-10", endDate: "2025-03-13", order: 1, activities: [
    { id: 1, name: "Eiffel Tower Visit", type: "Sightseeing", time: "10:00", cost: 2500 },
    { id: 2, name: "Louvre Museum", type: "Culture", time: "14:00", cost: 1800 },
  ]},
  { id: 2, city: "Amsterdam", startDate: "2025-03-14", endDate: "2025-03-16", order: 2, activities: [
    { id: 3, name: "Canal Boat Tour", type: "Experience", time: "11:00", cost: 3200 },
  ]},
  { id: 3, city: "Berlin", startDate: "2025-03-17", endDate: "2025-03-20", order: 3, activities: [] },
];

// ─── Design Tokens ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0c0c0e;
    --surface:   #141417;
    --surface2:  #1c1c21;
    --border:    rgba(255,255,255,0.09);
    --border2:   rgba(255,255,255,0.15);
    --text:      #f0f0f2;
    --muted:     #8a8a9a;
    --accent:    #7c5cfc;
    --accent2:   #9d7ffd;
    --danger:    #e05c5c;
    --success:   #4abe8f;
    --warn:      #e8a44a;
    --radius:    10px;
    --radius-lg: 16px;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

  /* ── Topbar ── */
  .topbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 52px;
    display: flex; align-items: center; gap: 12px;
    padding: 0 20px;
    background: rgba(12,12,14,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .topbar-logo {
    font-family: var(--font-head);
    font-weight: 800; font-size: 15px; letter-spacing: -0.3px;
    color: var(--text);
    display: flex; align-items: center; gap: 7px;
    flex-shrink: 0;
  }
  .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
  .topbar-search {
    flex: 1; max-width: 420px;
    display: flex; align-items: center; gap: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0 12px;
    height: 34px;
  }
  .topbar-search input {
    background: transparent; border: none; outline: none;
    color: var(--text); font-family: var(--font-body); font-size: 13px;
    width: 100%;
  }
  .topbar-search input::placeholder { color: var(--muted); }
  .topbar-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .tb-btn {
    height: 32px; padding: 0 12px;
    background: var(--surface2);
    border: 1px solid var(--border); border-radius: var(--radius);
    color: var(--muted); font-family: var(--font-body); font-size: 12px;
    cursor: pointer; transition: all .15s;
    display: flex; align-items: center; gap: 5px;
  }
  .tb-btn:hover { border-color: var(--border2); color: var(--text); }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head); font-size: 13px; font-weight: 700;
    color: #fff; cursor: pointer; flex-shrink: 0;
  }

  /* ── Nav Pills ── */
  .nav-pills {
    display: flex; align-items: center; gap: 4px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    margin-top: 52px;
  }
  .nav-pill {
    padding: 10px 14px;
    font-size: 13px; color: var(--muted);
    cursor: pointer; border-bottom: 2px solid transparent;
    transition: all .15s; white-space: nowrap;
    font-family: var(--font-body);
  }
  .nav-pill.active { color: var(--text); border-bottom-color: var(--accent); }
  .nav-pill:hover:not(.active) { color: var(--text); }

  /* ── Page Shell ── */
  .page { padding: 24px 24px 60px; max-width: 1100px; margin: 0 auto; }

  /* ── Section label ── */
  .section-label {
    font-family: var(--font-head);
    font-size: 11px; font-weight: 600; letter-spacing: .08em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 10px;
  }

  /* ── Card ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .card-pad { padding: 20px; }

  /* ── Input ── */
  .field { display: flex; flex-direction: column; gap: 5px; }
  .field label { font-size: 12px; color: var(--muted); font-family: var(--font-body); }
  .input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 9px 12px;
    color: var(--text); font-family: var(--font-body); font-size: 13.5px;
    outline: none; transition: border-color .15s; width: 100%;
  }
  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--muted); }
  textarea.input { resize: vertical; min-height: 80px; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 9px 18px;
    border-radius: var(--radius);
    font-family: var(--font-body); font-size: 13.5px; font-weight: 500;
    cursor: pointer; transition: all .15s; border: 1px solid transparent;
    white-space: nowrap;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent2); }
  .btn-outline {
    background: transparent; border-color: var(--border2);
    color: var(--text);
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent2); background: rgba(124,92,252,.08); }
  .btn-ghost { background: transparent; border-color: transparent; color: var(--muted); }
  .btn-ghost:hover { color: var(--text); background: var(--surface2); }
  .btn-danger { background: transparent; border-color: var(--danger); color: var(--danger); }
  .btn-danger:hover { background: rgba(224,92,92,.1); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-xs { padding: 4px 9px; font-size: 11px; border-radius: 7px; }

  /* ── Badge ── */
  .badge {
    display: inline-flex; align-items: center;
    padding: 2px 9px; border-radius: 99px;
    font-size: 11px; font-weight: 500; font-family: var(--font-body);
  }
  .badge-upcoming { background: rgba(124,92,252,.18); color: var(--accent2); }
  .badge-completed { background: rgba(74,190,143,.15); color: var(--success); }
  .badge-ongoing   { background: rgba(232,164,74,.15); color: var(--warn); }

  /* ── Divider ── */
  .divider { height: 1px; background: var(--border); margin: 18px 0; }

  /* ── Grid helpers ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .flex { display: flex; align-items: center; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .flex-end { display: flex; align-items: center; justify-content: flex-end; }
  .gap-8 { gap: 8px; } .gap-12 { gap: 12px; } .gap-16 { gap: 16px; }
  .mt-6 { margin-top: 6px; } .mt-10 { margin-top: 10px; }
  .mt-16 { margin-top: 16px; } .mt-20 { margin-top: 20px; } .mt-24 { margin-top: 24px; }
  .mb-6 { margin-bottom: 6px; } .mb-10 { margin-bottom: 10px; }
  .mb-16 { margin-bottom: 16px; } .mb-20 { margin-bottom: 20px; }
  .text-muted { color: var(--muted); font-size: 13px; }
  .text-sm { font-size: 12.5px; }
  .text-xs { font-size: 11.5px; }
  .fw-600 { font-weight: 600; }
  .font-head { font-family: var(--font-head); }

  /* ── Auth screen ── */
  .auth-shell {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg);
    padding: 24px;
  }
  .auth-card {
    width: 100%; max-width: 400px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 36px 32px;
  }
  .auth-logo {
    font-family: var(--font-head); font-size: 22px; font-weight: 800;
    display: flex; align-items: center; gap: 8px; margin-bottom: 28px;
  }
  .auth-title { font-family: var(--font-head); font-size: 20px; font-weight: 700; margin-bottom: 4px; }
  .auth-sub { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .auth-link { color: var(--accent2); cursor: pointer; font-size: 13px; }
  .auth-link:hover { text-decoration: underline; }
  .error-msg { font-size: 12px; color: var(--danger); margin-top: 4px; }
  .auth-footer { margin-top: 20px; text-align: center; color: var(--muted); font-size: 13px; }

  /* ── Dashboard ── */
  .welcome-banner {
    background: linear-gradient(135deg, #1a1430 0%, #1c1c21 60%, #111118 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 28px 24px;
    position: relative; overflow: hidden;
  }
  .welcome-banner::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,92,252,.25), transparent 70%);
  }
  .welcome-title { font-family: var(--font-head); font-size: 22px; font-weight: 700; }
  .welcome-sub { color: var(--muted); font-size: 13.5px; margin-top: 4px; }
  .stat-row { display: flex; gap: 12px; margin-top: 20px; }
  .stat-chip {
    background: rgba(255,255,255,.06);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px;
    flex: 1;
  }
  .stat-chip-val { font-family: var(--font-head); font-size: 20px; font-weight: 700; }
  .stat-chip-label { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* ── Trip card ── */
  .trip-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color .15s, transform .15s;
    cursor: pointer;
  }
  .trip-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .trip-card-cover { height: 130px; object-fit: cover; width: 100%; display: block; background: var(--surface2); }
  .trip-card-body { padding: 14px; }
  .trip-card-name { font-family: var(--font-head); font-size: 14px; font-weight: 700; }
  .trip-card-meta { font-size: 11.5px; color: var(--muted); margin-top: 3px; }
  .trip-card-actions { display: flex; gap: 6px; margin-top: 12px; }

  /* ── Dest card ── */
  .dest-card {
    border-radius: var(--radius-lg); overflow: hidden;
    border: 1px solid var(--border);
    position: relative; height: 140px;
  }
  .dest-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .dest-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 12px;
  }
  .dest-card-name { font-family: var(--font-head); font-size: 13px; font-weight: 700; }
  .dest-card-country { font-size: 11px; color: rgba(255,255,255,.65); }
  .dest-tag {
    position: absolute; top: 8px; right: 8px;
    background: rgba(0,0,0,.55); backdrop-filter: blur(8px);
    border-radius: 99px; padding: 2px 8px;
    font-size: 10.5px; color: rgba(255,255,255,.85);
  }

  /* ── Budget bar ── */
  .budget-bar-track { height: 6px; background: var(--surface2); border-radius: 99px; }
  .budget-bar-fill { height: 100%; border-radius: 99px; background: var(--accent); }

  /* ── Stop card ── */
  .stop-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .stop-header {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }
  .stop-num {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--accent); color: #fff;
    font-family: var(--font-head); font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .stop-body { padding: 14px 16px; }
  .activity-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: 8px;
  }
  .act-type-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ── Empty state ── */
  .empty-state {
    text-align: center; padding: 60px 24px;
    color: var(--muted);
  }
  .empty-icon { font-size: 40px; margin-bottom: 14px; }
  .empty-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
  .empty-sub { font-size: 13px; margin-bottom: 20px; }

  /* ── Upload area ── */
  .upload-area {
    border: 1.5px dashed var(--border2);
    border-radius: var(--radius-lg);
    padding: 28px; text-align: center;
    cursor: pointer; transition: border-color .15s;
    background: var(--surface2);
  }
  .upload-area:hover { border-color: var(--accent); }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: var(--radius-lg);
    padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,.5);
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px;
    animation: slideUp .25s ease;
  }
  @keyframes slideUp { from { transform: translateY(12px); opacity:0; } to { transform: translateY(0); opacity:1; } }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--success); flex-shrink: 0; }

  /* Responsive */
  @media (max-width: 768px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .stat-row { flex-direction: column; }
    .auth-card { padding: 28px 20px; }
    .page { padding: 16px 16px 60px; }
  }
`;  

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const nights = (a, b) => Math.ceil((new Date(b) - new Date(a)) / 86400000);

// ─── Shared components ────────────────────────────────────────────────────────
function Topbar({ page, setPage, user }) {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <div className="logo-dot" />
        Traveloop
      </div>
      <div className="topbar-search">
        <span style={{ color: "var(--muted)", fontSize: 13 }}>⌕</span>
        <input placeholder="Search trips, places…" />
      </div>
      <div className="topbar-actions">
        <button className="tb-btn" onClick={() => setPage("dashboard")}>Dashboard</button>
        <button className="tb-btn" onClick={() => setPage("trips")}>My Trips</button>
        <button className="tb-btn" onClick={() => setPage("notes")}>Notes</button>
        <button className="tb-btn" onClick={() => setPage("share")}>Share</button>
        <button className="tb-btn" onClick={() => setPage("settings")}>Settings</button>
        <button className="tb-btn" onClick={() => setPage("newtrip")}>+ Plan Trip</button>
        <div className="avatar" title={user?.name} onClick={() => setPage("settings")} style={{ cursor: "pointer" }}>{user?.name?.[0] || "P"}</div>
      </div>
    </div>
  );
}

function Toast({ msg, onClose }) {
  return (
    <div className="toast">
      <div className="toast-dot" />
      {msg}
      <button className="btn btn-ghost btn-xs" style={{ marginLeft: 8 }} onClick={onClose}>✕</button>
    </div>
  );
}

// ─── Screen 1: Login / Signup ─────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onLogin({ name: form.name || form.email.split("@")[0], email: form.email });
  };

  const set = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    setErrors({ ...errors, [k]: undefined });
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-dot" />
          <span style={{ fontFamily: "var(--font-head)" }}>Traveloop</span>
        </div>

        <div className="auth-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
        <div className="auth-sub">
          {mode === "login" ? "Sign in to plan your next adventure" : "Start planning your dream trips"}
        </div>

        {mode === "signup" && (
          <div className="field mb-16">
            <label>Full Name</label>
            <input className="input" placeholder="Piyush Sharma" value={form.name} onChange={set("name")} />
            {errors.name && <div className="error-msg">{errors.name}</div>}
          </div>
        )}

        <div className="field mb-16">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        <div className="field mb-6">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </div>

        {mode === "login" && (
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <span className="auth-link" style={{ fontSize: 12 }}>Forgot password?</span>
          </div>
        )}

        {mode !== "login" && <div style={{ height: 16 }} />}

        <button className="btn btn-primary" style={{ width: "100%", height: 42 }} onClick={submit}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div className="auth-footer">
          {mode === "login" ? (
            <>Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign up</span></>
          ) : (
            <>Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Sign in</span></>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Dashboard ──────────────────────────────────────────────────────
function Dashboard({ user, trips, setPage, setEditTrip }) {
  const upcoming = trips.filter((t) => t.status === "upcoming");
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalSpent = trips.reduce((s, t) => s + t.spent, 0);

  return (
    <div className="page">
      {/* Welcome banner */}
      <div className="welcome-banner mb-20">
        <div className="welcome-title">Good morning, {user.name.split(" ")[0]} ✈️</div>
        <div className="welcome-sub">You have {upcoming.length} upcoming trip{upcoming.length !== 1 ? "s" : ""} planned.</div>
        <div className="stat-row">
          <div className="stat-chip">
            <div className="stat-chip-val">{trips.length}</div>
            <div className="stat-chip-label">Total Trips</div>
          </div>
          <div className="stat-chip">
            <div className="stat-chip-val">{upcoming.length}</div>
            <div className="stat-chip-label">Upcoming</div>
          </div>
          <div className="stat-chip">
            <div className="stat-chip-val">₹{(totalBudget / 1000).toFixed(0)}k</div>
            <div className="stat-chip-label">Total Budget</div>
          </div>
          <div className="stat-chip">
            <div className="stat-chip-val" style={{ color: "var(--success)" }}>₹{((totalBudget - totalSpent) / 1000).toFixed(0)}k</div>
            <div className="stat-chip-label">Remaining</div>
          </div>
        </div>
      </div>

      {/* Budget summary */}
      <div className="card card-pad mb-20">
        <div className="flex-between mb-10">
          <div className="section-label">Budget Highlights</div>
          <button className="btn btn-ghost btn-xs">View full budget →</button>
        </div>
        {trips.map((t) => (
          <div key={t.id} style={{ marginBottom: 14 }}>
            <div className="flex-between mb-6">
              <div className="text-sm">{t.name}</div>
              <div className="text-xs text-muted">₹{t.spent.toLocaleString()} / ₹{t.budget.toLocaleString()}</div>
            </div>
            <div className="budget-bar-track">
              <div className="budget-bar-fill" style={{ width: `${Math.min(100, (t.spent / t.budget) * 100)}%`, background: t.spent > t.budget * 0.9 ? "var(--warn)" : "var(--accent)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <div className="flex-between mb-16">
        <div className="section-label" style={{ margin: 0 }}>Recent Trips</div>
        <div className="flex gap-8">
          <button className="btn btn-outline btn-sm" onClick={() => setPage("trips")}>View All</button>
          <button className="btn btn-primary btn-sm" onClick={() => setPage("newtrip")}>+ Plan New Trip</button>
        </div>
      </div>

      {/* Trip cards */}
      <div className="grid-3 mb-24">
        {trips.map((t) => (
          <TripCard key={t.id} trip={t} onEdit={() => { setEditTrip(t); setPage("newtrip"); }} onView={() => setPage("builder")} onDelete={() => {}} />
        ))}
      </div>

      {/* Recommended destinations */}
      <div className="section-label">Recommended Destinations</div>
      <div className="grid-4">
        {MOCK_DESTINATIONS.map((d) => (
          <div className="dest-card" key={d.name}>
            <img src={d.img} alt={d.name} onError={(e) => { e.target.style.background = "var(--surface2)"; }} />
            <div className="dest-card-overlay">
              <div className="dest-card-name">{d.name}</div>
              <div className="dest-card-country">{d.country}</div>
            </div>
            <div className="dest-tag">{d.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trip Card (reusable) ─────────────────────────────────────────────────────
function TripCard({ trip, onEdit, onView, onDelete }) {
  return (
    <div className="trip-card">
      <img className="trip-card-cover" src={trip.cover} alt={trip.name}
        onError={(e) => { e.target.style.background = "var(--surface2)"; e.target.src = ""; }} />
      <div className="trip-card-body">
        <div className="flex-between">
          <div className="trip-card-name">{trip.name}</div>
          <span className={`badge badge-${trip.status}`}>{trip.status}</span>
        </div>
        <div className="trip-card-meta">{fmt(trip.startDate)} → {fmt(trip.endDate)}</div>
        <div className="trip-card-meta" style={{ marginTop: 2 }}>{trip.stops.length} stops · {nights(trip.startDate, trip.endDate)} nights</div>
        <div className="trip-card-actions">
          <button className="btn btn-outline btn-xs" onClick={onView}>View</button>
          <button className="btn btn-ghost btn-xs" onClick={onEdit}>Edit</button>
          <button className="btn btn-danger btn-xs" style={{ marginLeft: "auto" }} onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Create / Edit Trip ────────────────────────────────────────────
function CreateTrip({ editTrip, onSave, setPage, showToast }) {
  const blank = { name: "", startDate: "", endDate: "", description: "", cover: "" };
  const [form, setForm] = useState(editTrip || blank);
  const [errors, setErrors] = useState({});

  const set = (k) => (ev) => { setForm({ ...form, [k]: ev.target.value }); setErrors({ ...errors, [k]: undefined }); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Trip name is required";
    if (!form.startDate) e.startDate = "Start date required";
    if (!form.endDate) e.endDate = "End date required";
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = "End must be after start";
    return e;
  };

  const save = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, id: editTrip?.id || Date.now(), stops: editTrip?.stops || [], budget: editTrip?.budget || 0, spent: editTrip?.spent || 0, status: editTrip?.status || "upcoming" });
    showToast(editTrip ? "Trip updated!" : "Trip created!");
    setPage("trips");
  };

  return (
    <div className="page">
      <div className="flex-between mb-20">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>
            {editTrip ? "Edit Trip" : "Plan a New Trip"}
          </div>
          <div className="text-muted mt-6">{editTrip ? "Update your trip details." : "Fill in the details to get started."}</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage("trips")}>← Back</button>
      </div>

      <div className="card card-pad" style={{ maxWidth: 680 }}>
        <div className="section-label">Trip Details</div>

        <div className="field mb-16">
          <label>Trip Name *</label>
          <input className="input" placeholder="e.g. Europe Summer 2025" value={form.name} onChange={set("name")} />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </div>

        <div className="grid-2 mb-16">
          <div className="field">
            <label>Start Date *</label>
            <input className="input" type="date" value={form.startDate} onChange={set("startDate")} />
            {errors.startDate && <div className="error-msg">{errors.startDate}</div>}
          </div>
          <div className="field">
            <label>End Date *</label>
            <input className="input" type="date" value={form.endDate} onChange={set("endDate")} />
            {errors.endDate && <div className="error-msg">{errors.endDate}</div>}
          </div>
        </div>

        <div className="field mb-16">
          <label>Description</label>
          <textarea className="input" placeholder="What's this trip about?" value={form.description} onChange={set("description")} />
        </div>

        <div className="field mb-20">
          <label>Cover Photo (URL)</label>
          <input className="input" placeholder="https://…" value={form.cover} onChange={set("cover")} />
        </div>

        {/* Upload area */}
        <div className="upload-area mb-20">
          <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
          <div className="text-sm fw-600">Or drag & drop a photo</div>
          <div className="text-xs text-muted mt-6">PNG, JPG up to 10MB</div>
        </div>

        <div className="divider" />

        <div className="flex-end gap-12">
          <button className="btn btn-ghost btn-sm" onClick={() => setPage("trips")}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>{editTrip ? "Save Changes" : "Create Trip ✈️"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: My Trips ───────────────────────────────────────────────────────
function MyTrips({ trips, setTrips, setPage, setEditTrip, showToast }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const deleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
    showToast("Trip deleted.");
  };

  const filtered = trips.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="page">
      {/* Header row */}
      <div className="flex-between mb-16">
        <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>My Trips</div>
        <button className="btn btn-primary btn-sm" onClick={() => { setEditTrip(null); setPage("newtrip"); }}>+ Plan New Trip</button>
      </div>

      {/* Filters + search row */}
      <div className="flex gap-8 mb-20" style={{ flexWrap: "wrap" }}>
        <div className="topbar-search" style={{ position: "static", height: 36, flex: "1 1 200px", maxWidth: 320 }}>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>⌕</span>
          <input placeholder="Search trips…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {["all", "upcoming", "ongoing", "completed"].map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(f)}
            style={{ textTransform: "capitalize" }}
          >{f}</button>
        ))}
        <button className="btn btn-outline btn-sm tb-btn" style={{ marginLeft: "auto" }}>Sort ↕</button>
        <button className="btn btn-outline btn-sm tb-btn">Filter ⌂</button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗺️</div>
          <div className="empty-title">No trips here yet</div>
          <div className="empty-sub">Start by planning your first adventure.</div>
          <button className="btn btn-primary" onClick={() => setPage("newtrip")}>+ Plan New Trip</button>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((t) => (
            <TripCard
              key={t.id}
              trip={t}
              onEdit={() => { setEditTrip(t); setPage("newtrip"); }}
              onView={() => setPage("builder")}
              onDelete={() => deleteTrip(t.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Screen 6: Public Itinerary (Sharable Link) ────────────────────────────────
function PublicItinerary({ setPage, showToast }) {
  const [copied, setCopied] = useState(false);
  const publicUrl = "https://traveloop.app/share/trip-abc123xyz";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    showToast("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform) => {
    const msg = encodeURIComponent("Check out my Golden Triangle India trip on Traveloop!");
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${msg}&url=${encodeURIComponent(publicUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`,
      whatsapp: `https://wa.me/?text=${msg} ${publicUrl}`
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <div className="page">
      <div className="flex-between mb-20">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>Share Your Trip</div>
          <div className="text-muted mt-6">Let others view, get inspired, or copy your itinerary</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage("trips")}>← Back</button>
      </div>

      {/* Share card */}
      <div className="card card-pad mb-20" style={{ maxWidth: 600 }}>
        <div className="section-label">Public Link</div>
        <div className="flex gap-8 mb-16">
          <input className="input" type="text" value={publicUrl} readOnly style={{ background: "var(--surface2)" }} />
          <button className="btn btn-primary btn-sm" onClick={copyToClipboard} style={{ whiteSpace: "nowrap" }}>
            {copied ? "✓ Copied" : "Copy Link"}
          </button>
        </div>

        <div className="divider" />

        {/* Itinerary summary */}
        <div className="section-label mt-20">Trip Summary</div>
        <div className="card" style={{ background: "var(--surface2)", border: "1px solid var(--border)", padding: "16px", marginBottom: 16, borderRadius: "10px" }}>
          <div className="flex-between mb-8">
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15 }}>Golden Triangle India</div>
            <span className="badge badge-upcoming">Upcoming</span>
          </div>
          <div className="text-sm text-muted mb-8">Delhi, Agra and Jaipur – the classic royal circuit.</div>
          <div className="flex gap-16 text-sm">
            <div><span className="fw-600">Dates:</span> Mar 10 - Mar 22, 2025</div>
            <div><span className="fw-600">Duration:</span> 12 nights</div>
            <div><span className="fw-600">Stops:</span> 3 cities</div>
          </div>
        </div>

        <div className="divider" />

        {/* Social sharing */}
        <div className="section-label mt-20">Share on Social Media</div>
        <div className="flex gap-8 mt-12">
          <button className="btn btn-outline" onClick={() => shareToSocial("twitter")} style={{ flex: 1 }}>
            <span>𝕏 Twitter</span>
          </button>
          <button className="btn btn-outline" onClick={() => shareToSocial("facebook")} style={{ flex: 1 }}>
            <span>f Facebook</span>
          </button>
          <button className="btn btn-outline" onClick={() => shareToSocial("whatsapp")} style={{ flex: 1 }}>
            <span>💬 WhatsApp</span>
          </button>
        </div>

        <div className="divider mt-20" />

        {/* Copy trip button */}
        <div className="mt-20">
          <button className="btn btn-primary" style={{ width: "100%" }}>
            📋 Copy This Trip
          </button>
        </div>
      </div>

      {/* Read-only itinerary preview */}
      <div className="card card-pad">
        <div className="section-label">Itinerary Preview (Read-Only)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          {[
            { city: "Delhi", days: "Mar 10-12", activities: ["Red Fort", "India Gate", "Taj Mahal day trip"] },
            { city: "Agra", days: "Mar 13-15", activities: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"] },
            { city: "Jaipur", days: "Mar 16-22", activities: ["City Palace", "Jantar Mantar", "Hawa Mahal"] }
          ].map((stop, idx) => (
            <div key={idx} style={{ padding: 12, background: "var(--surface2)", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
              <div className="fw-600">{stop.city}</div>
              <div className="text-xs text-muted mt-2">{stop.days}</div>
              <div className="text-sm mt-6">Activities:</div>
              <ul style={{ marginLeft: 20, marginTop: 4, fontSize: 13, color: "var(--muted)" }}>
                {stop.activities.map((act, i) => <li key={i}>{act}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: User Settings ──────────────────────────────────────────────────
function UserSettings({ user, setUser, setPage, showToast }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", photo: "", language: "en", notifications: true });

  const save = () => {
    setUser({ ...user, name: form.name, email: form.email });
    setEditMode(false);
    showToast("Profile updated!");
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      showToast("Account deleted.");
    }
  };

  return (
    <div className="page">
      <div className="flex-between mb-20">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>Settings</div>
          <div className="text-muted mt-6">Manage your profile, preferences, and account</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage("dashboard")}>← Back</button>
      </div>

      {/* Profile section */}
      <div className="card card-pad mb-20" style={{ maxWidth: 600 }}>
        <div className="section-label">Profile Information</div>
        
        {editMode ? (
          <>
            <div className="field mb-16">
              <label>Full Name</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field mb-16">
              <label>Email</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field mb-16">
              <label>Profile Photo (URL)</label>
              <input
                className="input"
                placeholder="https://…"
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
            </div>

            <div className="flex-end gap-8">
              <button className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save Changes</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-16 mb-16">
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#fff", fontWeight: 700 }}>
                {user?.name?.[0] || "P"}
              </div>
              <div>
                <div className="text-sm fw-600">{form.name}</div>
                <div className="text-sm text-muted mt-4">{form.email}</div>
              </div>
            </div>
            <button className="btn btn-outline" onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}
      </div>

      {/* Preferences */}
      <div className="card card-pad mb-20" style={{ maxWidth: 600 }}>
        <div className="section-label">Preferences</div>
        
        <div className="flex-between mb-16">
          <div>
            <div className="text-sm fw-600">Language</div>
            <div className="text-xs text-muted mt-2">Choose your preferred language</div>
          </div>
          <select className="input" style={{ maxWidth: 200 }} value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        <div className="divider" />

        <div className="flex-between mt-16">
          <div>
            <div className="text-sm fw-600">Notifications</div>
            <div className="text-xs text-muted mt-2">Email updates about your trips</div>
          </div>
          <input
            type="checkbox"
            checked={form.notifications}
            onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Saved destinations */}
      <div className="card card-pad mb-20" style={{ maxWidth: 600 }}>
        <div className="section-label">Saved Destinations</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 14 }}>
          {["Tokyo", "Paris", "Bali", "New York"].map((dest) => (
            <div key={dest} style={{ padding: 12, background: "var(--surface2)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="text-sm fw-600">{dest}</span>
              <button className="btn btn-ghost btn-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card card-pad" style={{ maxWidth: 600, background: "rgba(224,92,92,.08)", border: "1px solid var(--danger)" }}>
        <div className="section-label">Danger Zone</div>
        <div className="text-sm text-muted mb-12">Permanently delete your account and all associated data.</div>
        <button className="btn btn-danger" onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

// ─── Screen 8: Trip Notes ─────────────────────────────────────────────────────
function TripNotes({ setPage, showToast }) {
  const [notes, setNotes] = useState([
    { id: 1, date: "2025-03-10", title: "Day 1 Notes", content: "Flight was smooth. Checked in at hotel. Saw Red Fort in evening." },
    { id: 2, date: "2025-03-11", title: "Delhi explorations", content: "Visited India Gate and Qutb Minar. Loved the chai at the roadside." }
  ]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ date: "", title: "", content: "" });

  const addNote = () => {
    if (!newNote.title.trim()) return;
    setNotes([...notes, { id: Date.now(), ...newNote }]);
    setNewNote({ date: "", title: "", content: "" });
    setShowAddNote(false);
    showToast("Note saved!");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    showToast("Note deleted.");
  };

  return (
    <div className="page">
      <div className="flex-between mb-20">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>Trip Notes</div>
          <div className="text-muted mt-6">Write and save notes or reminders tied to your trip</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm" onClick={() => setPage("trips")}>← Back</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddNote(!showAddNote)}>
            {showAddNote ? "Cancel" : "+ Add Note"}
          </button>
        </div>
      </div>

      {/* Add note form */}
      {showAddNote && (
        <div className="card card-pad mb-20">
          <div className="section-label">New Note</div>
          
          <div className="field mb-16">
            <label>Date</label>
            <input
              className="input"
              type="date"
              value={newNote.date}
              onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
            />
          </div>

          <div className="field mb-16">
            <label>Title</label>
            <input
              className="input"
              placeholder="e.g. Packing reminders"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
          </div>

          <div className="field mb-16">
            <label>Note Content</label>
            <textarea
              className="input"
              placeholder="Write your note or reminder here…"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              style={{ minHeight: 120 }}
            />
          </div>

          <div className="flex-end gap-8">
            <button className="btn btn-ghost" onClick={() => setShowAddNote(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addNote}>Save Note</button>
          </div>
        </div>
      )}

      {/* Notes list */}
      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div className="empty-title">No notes yet</div>
          <div className="empty-sub">Start by adding a note for your trip.</div>
          <button className="btn btn-primary" onClick={() => setShowAddNote(true)}>+ Add Note</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {notes.map((note) => (
            <div key={note.id} className="card card-pad">
              <div className="flex-between mb-8">
                <div>
                  <div className="fw-600" style={{ fontSize: 15 }}>{note.title}</div>
                  <div className="text-xs text-muted mt-2">{new Date(note.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                </div>
                <button className="btn btn-danger btn-xs" onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
              <div className="text-sm text-muted" style={{ lineHeight: 1.5 }}>{note.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Screen 5: Itinerary Builder ─────────────────────────────────────────────
function ItineraryBuilder({ setPage, showToast }) {
  const [stops, setStops] = useState(MOCK_STOPS);
  const [newCity, setNewCity] = useState("");
  const [showAddStop, setShowAddStop] = useState(false);
  const [newStop, setNewStop] = useState({ city: "", startDate: "", endDate: "" });

  const addStop = () => {
    if (!newStop.city.trim()) return;
    setStops([...stops, { id: Date.now(), city: newStop.city, startDate: newStop.startDate, endDate: newStop.endDate, order: stops.length + 1, activities: [] }]);
    setNewStop({ city: "", startDate: "", endDate: "" });
    setShowAddStop(false);
    showToast(`${newStop.city} added to itinerary!`);
  };

  const removeStop = (id) => setStops(stops.filter((s) => s.id !== id));

  const moveStop = (id, dir) => {
    const idx = stops.findIndex((s) => s.id === id);
    const arr = [...stops];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setStops(arr.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const addActivity = (stopId) => {
    const name = prompt("Activity name:");
    if (!name) return;
    setStops(stops.map((s) =>
      s.id === stopId ? { ...s, activities: [...s.activities, { id: Date.now(), name, type: "Sightseeing", time: "10:00", cost: 0 }] } : s
    ));
  };

  const removeActivity = (stopId, actId) => {
    setStops(stops.map((s) =>
      s.id === stopId ? { ...s, activities: s.activities.filter((a) => a.id !== actId) } : s
    ));
  };

  return (
    <div className="page">
      <div className="flex-between mb-20">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700 }}>Itinerary Builder</div>
          <div className="text-muted mt-6">Drag stops to reorder · Add cities and activities</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm" onClick={() => setPage("trips")}>← Trips</button>
          <button className="btn btn-primary btn-sm" onClick={() => showToast("Itinerary saved!")}>Save Itinerary</button>
        </div>
      </div>

      {/* Add stop row */}
      <div className="card card-pad mb-20">
        <div className="flex-between mb-12">
          <div className="section-label" style={{ margin: 0 }}>Stops · {stops.length} cities</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddStop(!showAddStop)}>
            {showAddStop ? "Cancel" : "+ Add Stop"}
          </button>
        </div>

        {showAddStop && (
          <div className="grid-3 mt-10" style={{ alignItems: "flex-end" }}>
            <div className="field">
              <label>City *</label>
              <input className="input" placeholder="e.g. Rome" value={newStop.city} onChange={(e) => setNewStop({ ...newStop, city: e.target.value })} />
            </div>
            <div className="field">
              <label>Start Date</label>
              <input className="input" type="date" value={newStop.startDate} onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })} />
            </div>
            <div className="field">
              <label>End Date</label>
              <input className="input" type="date" value={newStop.endDate} onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })} />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-primary btn-sm" onClick={addStop}>Add City</button>
            </div>
          </div>
        )}

        {/* Timeline connector */}
        {stops.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {stops.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
                  <div style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>{s.city}</div>
                </div>
                {i < stops.length - 1 && (
                  <div style={{ width: 40, height: 1, background: "var(--border2)", marginBottom: 14 }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stop cards */}
      {stops.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌍</div>
          <div className="empty-title">No stops yet</div>
          <div className="empty-sub">Add your first city to get started.</div>
          <button className="btn btn-primary" onClick={() => setShowAddStop(true)}>+ Add Stop</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {stops.map((stop, idx) => (
            <div key={stop.id} className="stop-card">
              <div className="stop-header">
                <div className="stop-num">{stop.order}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15 }}>{stop.city}</div>
                  {stop.startDate && (
                    <div className="text-xs text-muted">{fmt(stop.startDate)} → {stop.endDate ? fmt(stop.endDate) : "?"}</div>
                  )}
                </div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost btn-xs" onClick={() => moveStop(stop.id, -1)} disabled={idx === 0} title="Move up">↑</button>
                  <button className="btn btn-ghost btn-xs" onClick={() => moveStop(stop.id, 1)} disabled={idx === stops.length - 1} title="Move down">↓</button>
                  <button className="btn btn-danger btn-xs" onClick={() => removeStop(stop.id)}>Remove</button>
                </div>
              </div>

              <div className="stop-body">
                <div className="flex-between mb-10">
                  <div className="section-label" style={{ margin: 0 }}>Activities · {stop.activities.length}</div>
                  <button className="btn btn-outline btn-xs" onClick={() => addActivity(stop.id)}>+ Add Activity</button>
                </div>

                {stop.activities.length === 0 ? (
                  <div style={{ padding: "16px 0", textAlign: "center" }}>
                    <div className="text-xs text-muted">No activities yet — add something to do!</div>
                  </div>
                ) : (
                  stop.activities.map((act) => (
                    <div key={act.id} className="activity-row">
                      <div className="act-type-dot" />
                      <div style={{ flex: 1 }}>
                        <div className="text-sm fw-600">{act.name}</div>
                        <div className="text-xs text-muted">{act.type} · {act.time}{act.cost ? ` · ₹${act.cost}` : ""}</div>
                      </div>
                      <button className="btn btn-ghost btn-xs" onClick={() => removeActivity(stop.id, act.id)}>✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {stops.length > 0 && (
        <div className="flex-end mt-24">
          <button className="btn btn-primary" onClick={() => showToast("Itinerary saved successfully!")}>
            Save Itinerary ✓
          </button>
        </div>
      )}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [trips, setTrips] = useState(MOCK_TRIPS);
  const [editTrip, setEditTrip] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (u) => {
    setUser(u);
    setPage("dashboard");
  };

  const handleSaveTrip = (trip) => {
    setTrips((prev) => {
      const exists = prev.find((t) => t.id === trip.id);
      return exists ? prev.map((t) => (t.id === trip.id ? trip : t)) : [trip, ...prev];
    });
  };

  return (
    <>
      <style>{css}</style>

      {!user ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <>
          <Topbar page={page} setPage={setPage} user={user} />
          <div style={{ paddingTop: 52 }}>
            {page === "dashboard" && (
              <Dashboard user={user} trips={trips} setPage={setPage} setEditTrip={setEditTrip} />
            )}
            {page === "newtrip" && (
              <CreateTrip editTrip={editTrip} onSave={handleSaveTrip} setPage={setPage} showToast={showToast} />
            )}
            {page === "trips" && (
              <MyTrips trips={trips} setTrips={setTrips} setPage={setPage} setEditTrip={setEditTrip} showToast={showToast} />
            )}
            {page === "builder" && (
              <ItineraryBuilder setPage={setPage} showToast={showToast} />
            )}
            {page === "share" && (
              <PublicItinerary setPage={setPage} showToast={showToast} />
            )}
            {page === "settings" && (
              <UserSettings user={user} setUser={setUser} setPage={setPage} showToast={showToast} />
            )}
            {page === "notes" && (
              <TripNotes setPage={setPage} showToast={showToast} />
            )}
          </div>
        </>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
