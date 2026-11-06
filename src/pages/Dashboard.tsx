import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  CreditCard,
  LayoutGrid,
  Lightbulb,
  LogOut,
  Megaphone,
  MessageSquare,
  Menu,
  Ticket,
  User,
  LifeBuoy,
} from 'lucide-react';
import Logo from '../components/Logo';
import { endAuthSession, getCurrentUserName } from '../auth';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Events', icon: CalendarDays },
  { label: 'My Events', icon: Ticket },
  { label: 'HackMate AI', icon: Bot },
  { label: 'IdeaCheck AI', icon: Lightbulb },
  { label: 'Certificates', icon: Award },
  { label: 'Digital Card', icon: CreditCard },
  { label: 'RuleBot AI', icon: MessageSquare },
  { label: 'Student Guide', icon: BookOpen },
  { label: 'Official Communications', icon: Megaphone },
  { label: 'Notifications', icon: Bell },
  { label: 'Help & Support', icon: LifeBuoy },
  { label: 'Profile', icon: User },
];

const STATS = [
  { label: 'REGISTERED', value: 0, note: 'EVENTS JOINED' },
  { label: 'ONGOING', value: 0, note: 'LIVE RIGHT NOW' },
  { label: 'COMPLETED', value: 0, note: 'FINISHED EVENTS' },
  { label: 'CERTIFICATES', value: 0, note: 'EARNED CREDENTIALS' },
];

const EVENTS = [
  {
    title: "ReBuild ’26",
    description: 'Frontend recreation challenge',
    date: 'Friday 6 Nov',
    status: 'Live',
  },
  {
    title: 'HackMate Sprint',
    description: 'Team finding and idea building',
    date: 'Open now',
    status: 'Open',
  },
  {
    title: 'IdeaCheck Review',
    description: 'AI idea screening event',
    date: '7 Nov',
    status: 'Upcoming',
  },
  {
    title: 'CampusPitch Mini',
    description: 'Short student pitch showcase',
    date: '9 Nov',
    status: 'Upcoming',
  },
];

const ACTIVITY = [
  {
    title: 'Created your CampusCode account',
    detail: 'Identity verified — digital card is ready.',
    time: '2H AGO',
    tone: 'purple',
  },
  {
    title: 'Opened ReBuild ’26 details',
    detail: 'Round 1 rules and submission checklist opened.',
    time: '04 NOV',
    tone: 'lime',
  },
  {
    title: 'Saved a teammate suggestion',
    detail: 'HackMate AI surfaced 3 profiles with matching skills.',
    time: '03 NOV',
    tone: 'lime',
  },
  {
    title: 'Updated your profile',
    detail: 'Skills and institution updated for team matching.',
    time: '01 NOV',
    tone: 'purple',
  },
];

const NOTIFICATIONS = [
  {
    title: "Round 1 Active: ReBuild '26",
    body: 'Round 1 is live. Submit your hosted demo link and repository before the deadline.',
    time: '04 NOV, 18:30',
  },
  {
    title: 'Team Formation Open',
    body: 'HackMate AI is ready to suggest teammates with complementary skill sets.',
    time: '03 NOV, 14:10',
  },
  {
    title: 'Certificates now available',
    body: 'Every completed event on your CampusCode profile issues a verifiable certificate.',
    time: '24 OCT, 12:00',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const displayName = getCurrentUserName();
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
  const [active, setActive] = useState('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  function handleNav(label: string) {
    setMenuOpen(false);
    if (label === 'Logout') {
      endAuthSession();
      navigate('/login', { replace: true });
      return;
    }
    setActive(label);
  }

  function scrollToNotifications() {
    notifRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="dash">
      <div className="dash-orb dash-orb--lime" aria-hidden="true" />
      <div className="dash-orb dash-orb--purple" aria-hidden="true" />

      {menuOpen ? (
        <button className="dash-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}

      <aside className={`dash-sidebar${menuOpen ? ' open' : ''}`}>
        <div className="dash-brand">
          <Logo />
        </div>

        <nav className="dash-nav" aria-label="Student workspace">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`side-item${active === label ? ' active' : ''}`}
              onClick={() => handleNav(label)}
              aria-current={active === label ? 'page' : undefined}
            >
              <Icon size={16} strokeWidth={1.7} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="dash-side-foot">
          <div className="side-user">
            <span className="side-avatar">{initials}</span>
            <span>
              <strong>{displayName}</strong>
              <small>STUDENT</small>
            </span>
          </div>
          <button type="button" className="dash-logout" onClick={() => handleNav('Logout')}>
            <LogOut size={15} strokeWidth={1.8} />
            <span>LOG OUT</span>
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <button
            type="button"
            className="dash-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.7} />
          </button>

          <div className="dash-top-actions">
            <button type="button" className="dash-bell" onClick={scrollToNotifications} aria-label="Notifications">
              <Bell size={17} strokeWidth={1.7} />
              <i aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="dash-content">
          {active === 'Overview' ? (
            <>
              <section className="landing-rise">
                <h1 className="dash-title">
                  WELCOME BACK, <span className="purple">{displayName.toUpperCase()}.</span>
                </h1>
                <p className="dash-sub">
                  Your CampusCode arena is ready. Track the events you have joined, keep an eye on
                  what is live, and pick up where you left off.
                </p>
              </section>

              <section className="dash-hero">
                <div className="dash-hero-copy">
                  <span>CAMPUSC0DE ARENA &middot; REBUILD &rsquo;26</span>
                  <h2>BUILD &bull; LEARN &bull; COLLABORATE</h2>
                  <p>
                    Every challenge on CampusCode runs on the same rhythm &mdash; ideate with your
                    team, build in public, and ship something worth judging.
                  </p>
                </div>
                <div className="dash-hero-mark">
                  <span className="cc-mark cc-mark--lg" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <em>HACKATHON<br />ARENA</em>
                </div>
              </section>

              <section className="dash-stats" aria-label="Your statistics">
                {STATS.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <small>{stat.note}</small>
                  </article>
                ))}
              </section>

              <section aria-labelledby="discover-events">
                <div className="dash-section-head">
                  <div>
                    <span className="dash-eyebrow">OPEN CALLS</span>
                    <h3 id="discover-events">Discover Events</h3>
                  </div>
                  <p>Live and upcoming hackathons across the CampusCode arena.</p>
                </div>

                <div className="event-grid">
                  {EVENTS.map((event) => (
                    <article className="event-card" key={event.title}>
                      <div className="event-card-top">
                        <span>{event.date}</span>
                        <span className={`event-status${event.status === 'Live' ? ' event-status--live' : ''}`}>
                          {event.status}
                        </span>
                      </div>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="utility-row" aria-label="Status">
                <article className="utility-card utility-card--empty">
                  <span>DEADLINES</span>
                  <strong>No deadlines right now</strong>
                  <p>You are all clear &mdash; no submissions or closing dates in the next 7 days.</p>
                </article>

                <article className="utility-card utility-card--lime">
                  <span>TEAMMATES</span>
                  <strong>Your teammates are ready</strong>
                  <p>
                    HackMate AI has matched 3 students with complementary skills for the next
                    build sprint.
                  </p>
                </article>

                <article className="utility-card">
                  <span>PROFILE COMPLETION</span>
                  <strong>3 of 5 steps done</strong>
                  <p>Add your skills and institution to improve team matching.</p>
                  <div className="progress-track" aria-hidden="true">
                    <i style={{ width: '60%' }} />
                  </div>
                  <div className="utility-foot">
                    <b>60%</b>
                    <span className="dash-eyebrow" style={{ color: '#8b8b84' }}>
                      COMPLETE
                    </span>
                  </div>
                </article>
              </section>

              <section className="dash-two-col" aria-label="Activity and notifications">
                <article className="panel-card">
                  <div className="panel-head">
                    <span>TIMELINE</span>
                    <h3>Current Activity</h3>
                  </div>
                  <div className="activity-list">
                    {ACTIVITY.map((item) => (
                      <div className="activity-row" key={item.title}>
                        <span
                          className={`activity-dot${item.tone === 'purple' ? ' activity-dot--purple' : ''}`}
                          aria-hidden="true"
                        />
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </div>
                        <time>{item.time}</time>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="panel-card" ref={notifRef}>
                  <div className="panel-head">
                    <span>INBOX</span>
                    <h3>Notifications</h3>
                  </div>
                  <div className="notif-list">
                    {NOTIFICATIONS.map((item) => (
                      <div className="notif-row" key={item.title}>
                        <span className="activity-dot" aria-hidden="true" />
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.body}</p>
                        </div>
                        <time>{item.time}</time>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          ) : active === 'Events' ? (
            <section className="dash-events-view" aria-labelledby="events-view-title">
              <div className="dash-section-head">
                <div>
                  <span className="dash-eyebrow">OPEN CALLS</span>
                  <h3 id="events-view-title">Discover Events</h3>
                </div>
                <p>Live and upcoming events across the CampusCode arena.</p>
              </div>

              <div className="event-grid">
                {EVENTS.map((event) => (
                  <article className="event-card" key={event.title}>
                    <div className="event-card-top">
                      <span>{event.date}</span>
                      <span className={`event-status${event.status === 'Live' ? ' event-status--live' : ''}`}>
                        {event.status}
                      </span>
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <section className="dash-empty-view">
              <span className="dash-eyebrow">SECTION &middot; {active.toUpperCase()}</span>
              <h2>{active}</h2>
              <p>
                This area belongs to the full CampusCode platform. ReBuild &rsquo;26 recreates the
                landing page, login, register and the student Overview &mdash; so only the
                Overview home screen is built out in this round.
              </p>
              <button type="button" className="cc-btn cc-btn--primary" onClick={() => setActive('Overview')}>
                BACK TO OVERVIEW <b>&rarr;</b>
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
