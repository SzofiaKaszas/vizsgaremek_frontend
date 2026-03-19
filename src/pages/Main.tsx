export function Main() {
  return (
    <div className="main-scope">
      <section className="hero">
        <h1 className="hero-title">Find Your Perfect Roommate</h1>
        <p className="hero-subtitle">
          Smart matching. Clean design. Real connections.
        </p>

        <div className="my-button-scope">
          <button onClick={() => window.location.href = "/login"} className="primary-btn">Find Roommates</button>
          <button onClick={() => window.location.href = "/login"} className="sec-btn">Create Account</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Smart Matching</h3>
          <p>We match you based on lifestyle, habits, and preferences.</p>
        </div>

        <div className="feature-card">
          <h3>Verified Users</h3>
          <p>Every profile is checked to keep the community safe.</p>
        </div>

        <div className="feature-card">
          <h3>Modern UI</h3>
          <p>Clean, fast, and easy to use on any device.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Roommate Finder — All rights reserved.</p>
      </footer>
    </div>
  );
}

