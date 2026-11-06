const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/node_modules/playwright');

const DIST = '/vercel/sandbox/workspace/dist';
const PORT = 4179;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, url);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

const results = [];
function check(name, cond) {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
}

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const base = `http://localhost:${PORT}`;

  // 1. Landing -> Login
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'LOGIN', exact: true }).first().click();
  await page.waitForTimeout(500);
  check('landing primary CTA -> /login', page.url().endsWith('/login'));

  // 2. Login -> Register via "Create account"
  await page.getByRole('link', { name: 'Create account' }).click();
  await page.waitForTimeout(500);
  check('login "Create account" -> /register', page.url().endsWith('/register'));

  // 3. Register -> Login via "Already have an account?"
  await page.getByRole('link', { name: 'Already have an account?' }).click();
  await page.waitForTimeout(500);
  check('register "Already have an account?" -> /login', page.url().endsWith('/login'));

  // 4. Login submit -> student
  await page.fill('#login-email', 'veboh@college.edu');
  await page.fill('#login-password', 'campuscode26');
  await page.getByRole('button', { name: /^LOGIN/ }).click();
  await page.waitForTimeout(1000);
  check('login submit -> /student', page.url().endsWith('/student'));
  check('dashboard greeting present', (await page.textContent('h1.dash-title')).includes('VEBOH'));

  // 5. Sidebar active state + order
  const labels = await page.$$eval('.side-item span', (els) => els.map((e) => e.textContent.trim()));
  const expected = ['Overview','Events','My Events','HackMate AI','IdeaCheck AI','Certificates','Digital Card','RuleBot AI','Student Guide','Official Communications','Notifications','Help & Support','Profile','Logout'];
  check('sidebar items exact + ordered', JSON.stringify(labels) === JSON.stringify(expected));
  check('Overview is active (lime)', await page.$eval('.side-item.active span', (e) => e.textContent.trim() === 'Overview'));

  // 6. Stat cards
  const stats = await page.$$eval('.stat-card strong', (els) => els.map((e) => e.textContent.trim()));
  check('stat cards are 0/0/0/0', JSON.stringify(stats) === JSON.stringify(['0','0','0','0']));
  const statLabels = await page.$$eval('.stat-card span', (els) => els.map((e) => e.textContent.trim()));
  check('stat labels', JSON.stringify(statLabels) === JSON.stringify(['REGISTERED','ONGOING','COMPLETED','CERTIFICATES']));

  // 7. Sections present
  check('Discover Events heading', (await page.textContent('h3')).includes('Discover Events'));
  const body = await page.textContent('body');
  check('hero status line', body.includes('BUILD • LEARN • COLLABORATE'));
  check('Current Activity card', body.includes('Current Activity'));
  check('Notifications card', body.includes('Notifications'));

  // 8. Register submit -> student
  await page.goto(base + '/register', { waitUntil: 'networkidle' });
  await page.fill('#register-name', 'Veboh');
  await page.fill('#register-email', 'veboh@college.edu');
  await page.fill('#register-password', 'campuscode26');
  await page.fill('#register-confirm', 'campuscode26');
  await page.check('#register-name, input[type=checkbox]').catch(() => {});
  await page.locator('.age-check input[type=checkbox]').check();
  await page.getByRole('button', { name: /CREATE ACCOUNT/ }).click();
  await page.waitForTimeout(1000);
  check('register submit -> /student', page.url().endsWith('/student'));

  // 9. Sidebar non-overview click shows placeholder, then back
  await page.getByRole('button', { name: 'Certificates' }).click();
  await page.waitForTimeout(300);
  check('sidebar section placeholder', (await page.textContent('.dash-empty-view h2')).trim() === 'Certificates');
  await page.getByRole('button', { name: /BACK TO OVERVIEW/ }).click();
  await page.waitForTimeout(300);
  check('back to overview works', (await page.$('.dash-title')) !== null);

  // 10. Logout -> login
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForTimeout(600);
  check('logout -> /login', page.url().endsWith('/login'));

  // 11. Password show/hide
  await page.fill('#login-password', 'secret');
  const before = await page.getAttribute('#login-password', 'type');
  await page.getByRole('button', { name: /Show password/ }).click();
  const after = await page.getAttribute('#login-password', 'type');
  check('password toggle works', before === 'password' && after === 'text');

  // 12. No console errors
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  check('no page errors', errors.length === 0);

  await browser.close();
  server.close();
  console.log(results.join('\n'));
  console.log(results.some((r) => r.startsWith('FAIL')) ? '\nSOME CHECKS FAILED' : '\nALL CHECKS PASSED');
})();
