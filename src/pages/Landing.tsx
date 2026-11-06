import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, GraduationCap, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

export default function Landing() {
  return (
    <div className="cc-page">
      <section className="landing-hero">
        <div className="cc-grid" aria-hidden="true" />
        <div className="cc-glow cc-glow--purple" aria-hidden="true" />
        <div className="cc-glow cc-glow--lime" aria-hidden="true" />

        <header className="cc-header">
          <Link to="/" aria-label="CampusCode home">
            <Logo />
          </Link>
          <nav className="cc-nav">
            <Link className="cc-navlink" to="/login">
              LOGIN
            </Link>
            <Link className="cc-navlink cc-navlink--dark" to="/register">
              REGISTER
            </Link>
          </nav>
        </header>

        <div className="landing-body landing-rise">
          <h1 className="landing-title">
            <span>BUILD</span>
            <span className="outline">COMPETE</span>
            <span>SHIP</span>
          </h1>

          <div className="landing-lede">
            <p>
              CampusCode is the arena where student teams build, compete and ship. Register for
              live hackathons, form a team, and track every deadline from a single student
              dashboard.
            </p>
          </div>

          <div className="landing-cta">
            <Link className="cc-btn cc-btn--primary" to="/login">
              LOGIN <b>&rarr;</b>
            </Link>
            <Link className="cc-btn cc-btn--ghost" to="/register">
              REGISTER <b>&rarr;</b>
            </Link>
          </div>
        </div>

        <div className="landing-foot">
          <span className="landing-scroll" aria-hidden="true">
            <i />
          </span>
        </div>
      </section>

      <main className="landing-rest">
        <section className="landing-section landing-about" id="about">
          <div className="landing-section-inner landing-about-inner">
            <div className="landing-about-copy">
              <span className="landing-label">WHAT IS CAMPUSCODE?</span>
              <h2 className="landing-editorial-title">
                <span>WHERE</span>
                <span>STUDENTS</span>
                <span className="landing-outline">BUILD.</span>
              </h2>
              <p className="landing-copy">
                A shared arena for students to explore ideas, find teammates, and build for real
                competitions.
              </p>
            </div>
            <div className="landing-orbit landing-orbit--about" aria-hidden="true">
              <span className="landing-orbit-ring landing-orbit-ring--outer" />
              <span className="landing-orbit-ring landing-orbit-ring--middle" />
              <span className="landing-orbit-ring landing-orbit-ring--inner" />
              <i className="landing-orbit-dot landing-orbit-dot--one" />
              <i className="landing-orbit-dot landing-orbit-dot--two" />
              <i className="landing-orbit-dot landing-orbit-dot--three" />
              <span className="landing-orbit-center">CC</span>
            </div>
          </div>
        </section>

        <section className="landing-section landing-together" id="build-together">
          <div className="landing-section-inner">
            <div className="landing-centered-heading">
              <span className="landing-label">THE CAMPUSCODE EXPERIENCE</span>
              <h2 className="landing-stacked-title">
                <span>BUILD</span>
                <span>TOGETHER.</span>
              </h2>
            </div>

            <article className="landing-arena-card">
              <div className="landing-arena-card-top">
                <span>CAMPUSCODE / 002</span>
                <span>ONE ARENA</span>
              </div>
              <h3>
                THE DIGITAL HOME
                <span>FOR STUDENT INNOVATION.</span>
              </h3>
              <div className="landing-role-grid">
                <div className="landing-role">
                  <GraduationCap aria-hidden="true" />
                  <strong>STUDENT</strong>
                  <p>Join challenges and bring your ideas to life.</p>
                </div>
                <div className="landing-role">
                  <Building2 aria-hidden="true" />
                  <strong>ORGANIZER</strong>
                  <p>Bring student competitions together in one place.</p>
                </div>
                <div className="landing-role">
                  <ShieldCheck aria-hidden="true" />
                  <strong>ADMIN</strong>
                  <p>Keep the arena clear, organized, and running smoothly.</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="landing-section landing-process" id="how-it-works">
          <div className="landing-section-inner">
            <span className="landing-label">HOW IT WORKS</span>
            <div className="landing-process-grid">
              <article className="landing-process-card">
                <span>01</span>
                <h3>DISCOVER</h3>
                <p>Find a challenge worth building for.</p>
              </article>
              <article className="landing-process-card">
                <span>02</span>
                <h3>TEAM UP</h3>
                <p>Meet teammates with complementary skills.</p>
              </article>
              <article className="landing-process-card">
                <span>03</span>
                <h3>BUILD</h3>
                <p>Turn an idea into a working project.</p>
              </article>
              <article className="landing-process-card">
                <span>04</span>
                <h3>SHIP</h3>
                <p>Present your work and share what you made.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="landing-section landing-arena-list" id="enter-arena">
          <div className="landing-section-inner">
            <span className="landing-label">ENTER THE ARENA</span>
            <div className="landing-track-list">
              <article className="landing-track-row">
                <strong>AI INNOVATION</strong>
                <span>Explore useful ideas powered by artificial intelligence.</span>
                <ArrowUpRight aria-hidden="true" />
              </article>
              <article className="landing-track-row">
                <strong>FUTURE WEB</strong>
                <span>Shape new ways to build and experience the web.</span>
                <ArrowUpRight aria-hidden="true" />
              </article>
              <article className="landing-track-row">
                <strong>CAMPUS TECH</strong>
                <span>Build tools and experiences for campus life.</span>
                <ArrowUpRight aria-hidden="true" />
              </article>
            </div>
          </div>
        </section>

        <section className="landing-section landing-ideas" id="ideas">
          <span className="landing-ideas-watermark" aria-hidden="true">IDEAS</span>
          <div className="landing-section-inner landing-ideas-inner">
            <div>
              <span className="landing-label">IDEAS TO BUILD</span>
              <h2 className="landing-editorial-title">
                <span>GREAT</span>
                <span>IDEAS</span>
                <span className="landing-outline">NEED BUILDERS.</span>
              </h2>
              <p className="landing-copy">
                Bring a bold thought, then find the people and challenges to make it real.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-section landing-people" id="community">
          <div className="landing-section-inner landing-people-inner">
            <div className="landing-people-copy">
              <span className="landing-label">COMMUNITY</span>
              <h2 className="landing-editorial-title">
                <span>FIND</span>
                <span>YOUR</span>
                <span className="landing-outline">PEOPLE.</span>
              </h2>
            </div>
            <div className="landing-people-art">
              <div className="landing-orbit landing-orbit--people" aria-hidden="true">
                <span className="landing-orbit-ring landing-orbit-ring--outer" />
                <span className="landing-orbit-ring landing-orbit-ring--middle" />
                <span className="landing-orbit-ring landing-orbit-ring--inner" />
                <i className="landing-orbit-dot landing-orbit-dot--one" />
                <i className="landing-orbit-dot landing-orbit-dot--two" />
                <i className="landing-orbit-dot landing-orbit-dot--three" />
                <span className="landing-orbit-center">CC</span>
              </div>
              <span className="landing-micro-caption">GOOD BUILDS START WITH GOOD PEOPLE.</span>
            </div>
          </div>
        </section>

        <section className="landing-section landing-cta-section" id="contact">
          <div className="cc-grid" aria-hidden="true" />
          <div className="cc-glow cc-glow--purple-sm" aria-hidden="true" />
          <div className="landing-cta-content">
            <span className="landing-label">YOUR NEXT STEP</span>
            <h2 className="landing-stacked-title landing-cta-title">
              <span>YOUR NEXT</span>
              <span className="landing-outline">PROJECT</span>
              <span>STARTS HERE.</span>
            </h2>
            <Link className="cc-btn cc-btn--primary landing-join-button" to="/register" id="register">
              JOIN CAMPUSCODE <b aria-hidden="true">&rarr;</b>
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer" id="footer">
        <div className="landing-footer-main">
          <div className="landing-footer-brand">
            <Link to="/" aria-label="CampusCode home">
              <Logo />
            </Link>
            <p>
              The student hackathon arena.<br />
              You build the idea.<br />
              We run the competition.
            </p>
          </div>

          <div className="landing-footer-column">
            <h2>PRODUCT</h2>
            <a href="#about">About</a>
            <a href="#enter-arena">Hackathons</a>
            <a href="#how-it-works">How it works</a>
            <a href="#community">Community</a>
          </div>
          <div className="landing-footer-column">
            <h2>BUILDERS</h2>
            <a href="#community">Students</a>
            <a href="#community">Teams</a>
            <a href="#build-together">Organizers</a>
            <a href="#build-together">Developers</a>
          </div>
          <div className="landing-footer-column">
            <h2>GUIDES</h2>
            <a href="#enter-arena">Hackathon Rules</a>
            <a href="#how-it-works">FAQ</a>
            <a href="#community">Support</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span className="landing-system-status"><i aria-hidden="true" />ALL SYSTEMS OPERATIONAL</span>
          <nav aria-label="Footer links">
            <a href="#footer">TERMS</a>
            <a href="#footer">PRIVACY</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
