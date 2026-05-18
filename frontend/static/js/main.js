/* ===== API BASE ===== */
const API = '';

/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function animTrail() {
  tx += (mx - tx) * 0.18;
  ty += (my - ty) * 0.18;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animTrail);
})();

/* ===== MATRIX CANVAS ===== */
function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const cols = Math.floor(canvas.width / 18);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコ@#$%&*<>/\\[]{}';
  setInterval(() => {
    ctx.fillStyle = 'rgba(5,8,16,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Space Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.93;
      ctx.fillStyle = bright ? '#ffffff' : i % 3 === 0 ? '#00f5d4' : '#0a4a3e';
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 55);
}

/* ===== TYPE WRITER ===== */
function typeWrite(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const t = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else clearInterval(t);
  }, speed);
}

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
}

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== LOAD PORTFOLIO DATA ===== */
async function loadPortfolio() {
  try {
    const res = await fetch(`${API}/api/portfolio`);
    const data = await res.json();
    renderHero(data.hero);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderExperience(data.experience);
  } catch(e) {
    console.error('API error, using fallback', e);
    renderHeroFallback();
  }
}

/* ===== RENDER HERO ===== */
function renderHero(hero) {
  const nameEl = document.getElementById('heroName');
  typeWrite(nameEl, hero.name, 55);
}
function renderHeroFallback() {
  typeWrite(document.getElementById('heroName'), 'Anudeep Gumpula', 55);
}

/* ===== RENDER ABOUT ===== */
function renderAbout(about) {
  document.getElementById('aboutBio').textContent = about.bio;
  const hl = document.getElementById('aboutHighlights');
  hl.innerHTML = about.highlights.map(h =>
    `<div class="about-highlight-item reveal">${h}</div>`
  ).join('');

  const hero = PORTFOLIO_CACHE?.hero || {};
  document.getElementById('profileJson').innerHTML = `
<div><span class="json-bracket">{</span></div>
<div>&nbsp;&nbsp;<span class="json-key">"name"</span>: <span class="json-str">"Anudeep Gumpula"</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"role"</span>: <span class="json-str">"Software Engineer"</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"location"</span>: <span class="json-str">"United States"</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"education"</span>: <span class="json-str">"MS CS, Rivier Univ."</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"gpa"</span>: <span class="json-num">3.8</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"open_to_work"</span>: <span class="json-val">true</span>,</div>
<div>&nbsp;&nbsp;<span class="json-key">"email"</span>: <span class="json-str">"anudeepgumpula@<br>&nbsp;&nbsp;&nbsp;&nbsp;gmail.com"</span></div>
<div><span class="json-bracket">}</span></div>`;
  observeReveal();
}

/* ===== RENDER SKILLS ===== */
function renderSkills(skills) {
  document.getElementById('skillsGrid').innerHTML = skills.map((s, i) => `
    <div class="skill-card reveal" style="transition-delay:${i*0.08}s">
      <div class="skill-category">${s.category}</div>
      <div class="skill-items">
        ${s.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
  observeReveal();
}

/* ===== RENDER PROJECTS ===== */
function renderProjects(projects) {
  document.getElementById('projectsGrid').innerHTML = projects.map((p, i) => `
    <div class="project-card reveal" style="transition-delay:${i*0.1}s">
      <div class="project-num">// project_${String(i+1).padStart(2,'0')}</div>
      <div>
        <div class="project-highlight-badge">${p.highlight}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-subtitle">${p.subtitle}</div>
      </div>
      <p class="project-desc">${p.description}</p>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" target="_blank" class="project-link">⌥ github</a>` : '<span class="project-link" style="color:var(--text-muted)">⊘ private</span>'}
      </div>
    </div>
  `).join('');
  observeReveal();
}

/* ===== RENDER EXPERIENCE ===== */
function renderExperience(experience) {
  document.getElementById('timeline').innerHTML = experience.map((exp, i) => `
    <div class="timeline-item" style="transition-delay:${i*0.1}s">
      <div class="timeline-dot"></div>
      <div class="timeline-period">${exp.period}</div>
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-company">
        ${exp.company}
        <span class="timeline-location">${exp.location}</span>
      </div>
      <div class="timeline-highlights">
        ${exp.highlights.map(h => `<div class="timeline-highlight">${h}</div>`).join('')}
      </div>
    </div>
  `).join('');
  observeReveal();
}

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  if (!name || !email || !message) return;
  btn.textContent = 'sending...';
  btn.disabled = true;
  try {
    const res = await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();
    status.className = 'form-status success';
    status.textContent = data.message;
    e.target.reset();
  } catch(err) {
    status.className = 'form-status error';
    status.textContent = 'Could not send — please email directly.';
  } finally {
    btn.textContent = 'send_message()';
    btn.disabled = false;
  }
});

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== GLOBAL CACHE ===== */
let PORTFOLIO_CACHE = null;
async function bootstrap() {
  try {
    const res = await fetch(`${API}/api/portfolio`);
    PORTFOLIO_CACHE = await res.json();
    renderHero(PORTFOLIO_CACHE.hero);
    renderAbout(PORTFOLIO_CACHE.about);
    renderSkills(PORTFOLIO_CACHE.skills);
    renderProjects(PORTFOLIO_CACHE.projects);
    renderExperience(PORTFOLIO_CACHE.experience);
  } catch(e) {
    renderHeroFallback();
  }
}

/* ===== INIT ===== */
initMatrix();
bootstrap();
