// ══════════════════════════════════════
// DATA
// ══════════════════════════════════════
const PROJECTS = [
  {
    id:'careerpilot',emoji:'🧭',name:'CareerPilot AI',
    tags:['ai','fullstack'],
    techs:['React','Vite','Tailwind','Node.js','Express','MongoDB','Gemini'],
    color:'rgba(217,119,6,0.12)',
    short:'Full-stack AI career assistant — resume analysis, job matching, and interview prep powered by Gemini.',
    long:`CareerPilot AI is a full-stack career assistant platform built with React/Vite/Tailwind on the frontend and Node/Express/MongoDB on the backend. It integrates Google's Gemini AI to help users with resume analysis, career path recommendations, and interview preparation. The project spans 64 files and includes JWT authentication, a flat zinc-950 dark theme with amber-500 accents, and a complete REST API.`,
    github:'https://github.com/mohsinrz-dev',live:null
  },
  {
    id:'futureyou',emoji:'🌟',name:'FutureYou AI',
    tags:['ai','fullstack'],
    techs:['React','Express','MongoDB','Gemini','JWT'],
    color:'rgba(244,192,77,0.1)',
    short:'Personal evolution platform — habit tracker, goal manager, AI coach, and evolution score dashboard.',
    long:`FutureYou AI is a personal growth web application with a dark/gold aesthetic. It includes a habit tracker, goal manager, AI coaching powered by Gemini, and an evolution score dashboard. The backend uses Express and MongoDB with JWT authentication. The app runs end-to-end locally and is being deployed to Vercel (frontend) and Railway (backend). Features a cinematic hero animation with canvas-based branding.`,
    github:'https://github.com/mohsinrz-dev',live:null
  },
  {
    id:'devforge',emoji:'⚒️',name:'DevForge',
    tags:['ai','fullstack'],
    techs:['Java','Spring Boot','React','TypeScript'],
    color:'rgba(96,165,250,0.1)',
    short:'All-in-one AI development platform: AI Model Hub, collaborative code workspace, design studio, and presentation studio.',
    long:`DevForge is an ambitious all-in-one AI development platform. It includes an AI Model Hub with free access and a 5h30m cooldown system, a collaborative code workspace, an integration intelligence layer, a design studio, and a presentation studio. The entire backend is written in Java Spring Boot with no comments — every line written to read as human-intent code. The UI follows a 16-screen mockup with a full production architecture.`,
    github:'https://github.com/mohsinrz-dev',live:null
  },
  {
    id:'morphshield',emoji:'🛡️',name:'MorphShield',
    tags:['frontend'],
    techs:['JavaScript'],
    color:'rgba(52,211,153,0.1)',
    short:'Security-focused JavaScript project featuring dynamic defence mechanisms and real-time threat pattern logic.',
    long:`MorphShield is a JavaScript project exploring dynamic security mechanisms. It demonstrates real-time threat pattern detection and responsive defence logic built entirely in vanilla JavaScript. A focused exploration of security concepts through code.`,
    github:'https://github.com/mohsinrz-dev',live:null
  },
  {
    id:'jansahay',emoji:'🤝',name:'Jansahay',
    tags:['fullstack'],
    techs:['TypeScript'],
    color:'rgba(251,146,60,0.1)',
    short:'TypeScript-based civic assistance platform connecting citizens with government services — type-safe from end to end.',
    long:`Jansahay is a civic assistance platform built with TypeScript, designed to connect citizens with the services they need. The type-safe architecture ensures reliability across the full application surface. Built as a private repository with a focus on scalable, well-typed service layers.`,
    github:'https://github.com/mohsinrz-dev',live:null
  },
  {
    id:'portfolio',emoji:'🎨',name:'Portfolio Website',
    tags:['frontend'],
    techs:['HTML','CSS','JavaScript'],
    color:'rgba(245,158,11,0.10)',
    short:'Modern responsive portfolio with glassmorphism UI, smooth animations, project showcase, and temperature converter — built for Oasis Infobyte.',
    long:`A responsive portfolio website built for the Oasis Infobyte internship submission. Features include a landing page with glassmorphism UI, scroll animations, a project showcase section, a contact form, and a fully functional temperature converter. Built with zero frameworks — pure HTML, CSS, and JavaScript — as a demonstration of foundational web development skills.`,
    github:'https://github.com/mohsinrz-dev/mohsin-portfolio',live:null
  }
];

// ══════════════════════════════════════
// ROUTING
// ══════════════════════════════════════
const PAGES = ['home','about','projects','services','contact'];
let currentPage = 'home';

function navigate(page){
  if(!PAGES.includes(page)) page='home';
  const old = document.getElementById('page-'+currentPage);
  const next = document.getElementById('page-'+page);
  if(old===next) return;
  old.classList.add('page-exit');
  setTimeout(()=>{
    old.classList.remove('active','page-exit');
    next.classList.add('active','page-enter');
    setTimeout(()=>next.classList.remove('page-enter'),500);
    window.scrollTo({top:0,behavior:'instant'});
    currentPage = page;
    updateNav(page);
    if(page==='projects') renderProjects('all');
    initReveals();
    history.pushState({page},'',`#${page}`);
  },200);
}

function updateNav(page){
  document.querySelectorAll('[data-page]').forEach(a=>{
    a.classList.toggle('active',a.dataset.page===page);
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>{
    a.classList.toggle('active',a.textContent.toLowerCase()===page);
  });
}

window.addEventListener('popstate',e=>{
  const page = (e.state && e.state.page) || location.hash.replace('#','') || 'home';
  navigate(page);
});

window.addEventListener('load',()=>{
  const hash = location.hash.replace('#','');
  if(hash && PAGES.includes(hash)) navigate(hash);
  else{ updateNav('home'); renderProjects('all'); initReveals(); }
});

// ══════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════
function toggleMobile(){
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  m.classList.toggle('open');
  h.classList.toggle('open');
}
function closeMobile(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
window.closeMobile = closeMobile;

// ══════════════════════════════════════
// PROJECTS RENDER
// ══════════════════════════════════════
function renderProjects(filter){
  const grid = document.getElementById('projectsGrid');
  const list = filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.tags.includes(filter));
  grid.innerHTML = list.map(p=>`
    <div class="project-card reveal" onclick="openModal('${p.id}')">
      <div class="pc-thumb"><div class="pc-thumb-inner" style="background:${p.color}">${p.emoji}</div></div>
      <div class="pc-body">
        <div class="pc-tags">${p.techs.slice(0,3).map(t=>`<span class="pc-tag">${t}</span>`).join('')}</div>
        <div class="pc-name">${p.name}</div>
        <p class="pc-desc">${p.short}</p>
        <div class="pc-links">
          <a class="pc-link" href="${p.github}" target="_blank" onclick="event.stopPropagation()">
            <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
          <span class="pc-link" style="cursor:pointer">View details →</span>
        </div>
      </div>
    </div>
  `).join('');
  initReveals();
  document.querySelectorAll('.filter-btn').forEach(b=>{
    b.classList.toggle('active',b.dataset.filter===filter);
    b.onclick=()=>renderProjects(b.dataset.filter);
  });
}

// ══════════════════════════════════════
// MODAL
// ══════════════════════════════════════
function openModal(id){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('modalBody').innerHTML=`
    <div class="modal-icon">${p.emoji}</div>
    <h2>${p.name}</h2>
    <div class="modal-tags">${p.techs.map(t=>`<span class="pc-tag">${t}</span>`).join('')}</div>
    <p>${p.long}</p>
    <div class="modal-actions">
      <a href="${p.github}" target="_blank" class="btn btn-g" style="font-size:.82rem;padding:10px 20px">View on GitHub</a>
      ${p.live?`<a href="${p.live}" target="_blank" class="btn btn-p" style="font-size:.82rem;padding:10px 20px">Live demo</a>`:''}
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(e){
  if(e && e.target!==document.getElementById('modalOverlay') && !e.currentTarget.classList.contains('modal-close')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}
window.openModal=openModal;
window.closeModal=closeModal;
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal({target:document.getElementById('modalOverlay')}); });

// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
function initReveals(){
  const els = document.querySelectorAll('#page-'+currentPage+' .reveal:not(.visible)');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'), i*80);
      }
    });
  },{threshold:0.1});
  els.forEach(el=>obs.observe(el));
}

// ══════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent='Sending…';btn.disabled=true;
  setTimeout(()=>{
    this.style.display='none';
    document.getElementById('formSuccess').style.display='block';
  },1200);
});

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
updateNav('home');
initReveals();
