import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Logo from '../components/Logo';
import Captcha, { useCaptcha } from '../components/Captcha';
import { startAuthSession } from '../auth';

export default function Login() {
  const navigate = useNavigate();
  const { code, refresh } = useCaptcha();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus({ tone: 'error', text: 'Enter the email address linked to your CampusCode account.' });
      return;
    }
    if (!password) {
      setStatus({ tone: 'error', text: 'Enter your password to continue.' });
      return;
    }
    if (captcha.trim() && captcha.trim().toUpperCase() !== code) {
      setStatus({ tone: 'error', text: 'That captcha code does not match. Try the code shown on the left.' });
      return;
    }

    setStatus({ tone: 'ok', text: 'Verified. Opening your student dashboard…' });
    startAuthSession(email);
    window.setTimeout(() => navigate('/student'), 420);
  }

  function handleForgotPassword() {
    setStatus({
      tone: 'ok',
      text: 'A password reset link will be sent to the email address on your CampusCode account.',
    });
  }

  return (
    <div className="auth-page">
      <div className="cc-grid" aria-hidden="true" />
      <div className="cc-glow cc-glow--purple" aria-hidden="true" />
      <div className="cc-glow cc-glow--lime" aria-hidden="true" />

      <header className="auth-nav">
        <Link to="/" aria-label="CampusCode home">
          <Logo />
        </Link>
        <Link className="cc-navlink" to="/">
          &larr; BACK TO HOME
        </Link>
      </header>

      <main className="auth-main">
        <section className="auth-intro">
          <h1 className="auth-title">
            ENTER <span className="outline">THE</span> ARENA.
          </h1>

          <p className="auth-desc">
            Sign in to your CampusCode account to reach your student dashboard &mdash; live
            hackathons, team matching, certificates and every announcement in one place.
          </p>
        </section>

        <section className="auth-card">
          <div className="auth-card-top">
            <div>
              <span className="auth-eyebrow">EXISTING ACCOUNT</span>
              <h2>LOGIN</h2>
              <p className="auth-card-sub">Access your CampusCode student dashboard.</p>
            </div>
            <span className="auth-index-mark">CC / STUDENT ACCESS</span>
          </div>

          <div className="auth-divider" />

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">EMAIL ADDRESS</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <Mail size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">PASSWORD</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <Lock size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-captcha">CAPTCHA VERIFICATION</label>
              <div className="captcha-row">
                <Captcha code={code} onRefresh={refresh} />
                <input
                  id="login-captcha"
                  className="captcha-input"
                  type="text"
                  inputMode="text"
                  maxLength={5}
                  placeholder="CODE"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                />
              </div>
              <span className="auth-hint">
                MOCK VERIFICATION &middot; ENTER THE 5-CHARACTER CODE, OR LEAVE BLANK TO CONTINUE.
              </span>
            </div>

            {status ? (
              <div className={`auth-status${status.tone === 'error' ? ' auth-status--error' : ' auth-status--ok'}`}>
                <span aria-hidden="true">{status.tone === 'error' ? '!' : '\u2713'}</span>
                <p style={{ margin: 0 }}>{status.text}</p>
              </div>
            ) : null}

            <button type="submit" className="auth-submit">
              LOGIN <b>&rarr;</b>
            </button>

            <div className="auth-card-foot">
              <span>STUDENT ACCESS PORTAL</span>
              <div className="auth-card-links">
                <button type="button" className="auth-link" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
                <Link className="auth-link" to="/register">
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </section>
      </main>

    </div>
  );
}
