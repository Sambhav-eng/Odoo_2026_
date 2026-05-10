


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
  }`


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

function Home() {
  return (
    <>
      <style>{css}</style>
      <Dashboard />
    </>
  );
}


export default Home;