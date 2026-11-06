import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import Logo from '../components/Logo';
import Captcha, { useCaptcha } from '../components/Captcha';
import { saveRegisteredProfile, startAuthSession } from '../auth';

export default function Register() {
  const navigate = useNavigate();
  const { code, refresh } = useCaptcha();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('student');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim()) {
      setStatus({ tone: 'error', text: 'Enter your full name as it should appear on your digital card.' });
      return;
    }
    if (!email.trim()) {
      setStatus({ tone: 'error', text: 'Enter the email address you want to use for CampusCode.' });
      return;
    }
    if (password.length < 8) {
      setStatus({ tone: 'error', text: 'Your password needs at least 8 characters.' });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ tone: 'error', text: 'Both passwords must match. Please re-check and try again.' });
      return;
    }
    if (!ageConfirmed) {
      setStatus({ tone: 'error', text: 'Please confirm that you are 18 years or older to continue.' });
      return;
    }
    if (captcha.trim() && captcha.trim().toUpperCase() !== code) {
      setStatus({ tone: 'error', text: 'That captcha code does not match. Try the code shown on the left.' });
      return;
    }

    setStatus({ tone: 'ok', text: 'Account created. Opening your student dashboard…' });
    saveRegisteredProfile(fullName, email);
    startAuthSession(email);
    window.setTimeout(() => navigate('/student'), 420);
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
          <div className="auth-index">
            <span>CC / AUTH</span>
          </div>

          <h1 className="auth-title">
            JOIN <span className="outline">THE</span> ARENA.
          </h1>

          <p className="auth-desc">
            Create your CampusCode account to register for hackathons, find teammates and earn
            certificates &mdash; everything a student needs to build, compete and ship.
          </p>
        </section>

        <section className="auth-card">
          <div className="auth-card-top">
            <div>
              <span className="auth-eyebrow">NEW ACCOUNT</span>
              <h2>REGISTER</h2>
              <p className="auth-card-sub">Start your CampusCode journey in under a minute.</p>
            </div>
            <span className="auth-index-mark">CC / NEW STUDENT</span>
          </div>

          <div className="auth-divider" />

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="register-name">FULL NAME</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <User size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">EMAIL ADDRESS</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <Mail size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">PASSWORD</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <Lock size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
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
              <label htmlFor="register-confirm">CONFIRM PASSWORD</label>
              <div className="auth-input">
                <span className="auth-input-icon">
                  <Lock size={15} strokeWidth={1.6} />
                </span>
                <input
                  id="register-confirm"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-type">ACCOUNT TYPE</label>
              <div className="auth-input" style={{ position: 'relative' }}>
                <span className="auth-input-icon">
                  <User size={15} strokeWidth={1.6} />
                </span>
                <select
                  id="register-type"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="student">Student &mdash; Participant</option>
                  <option value="organizer">Organizer &mdash; Campus Lead</option>
                </select>
                <span className="auth-select-arrow" aria-hidden="true">
                  &#9662;
                </span>
              </div>
            </div>

            <div className="auth-field">
              <label className="age-check">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                />
                <span>
                  I confirm that I am <b style={{ color: '#7665ff' }}>18 years or older</b> and
                  agree to the CampusCode participation rules.
                </span>
              </label>
            </div>

            <div className="auth-field">
              <label htmlFor="register-captcha">CAPTCHA VERIFICATION</label>
              <div className="captcha-row">
                <Captcha code={code} onRefresh={refresh} />
                <input
                  id="register-captcha"
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
              CREATE ACCOUNT <b>&rarr;</b>
            </button>

            <div className="auth-card-foot">
              <span>STUDENT ACCESS PORTAL</span>
              <div className="auth-card-links">
                <Link className="auth-link" to="/login">
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </section>
      </main>

      <footer className="auth-bottom">
        <span>CAMPUSC0DE ARENA</span>
      </footer>
    </div>
  );
}
