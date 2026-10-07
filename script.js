/**
 * ====================================================================
 * PORTFOLIO CLIENT SCRIPT
 * Vanilla JavaScript - Zero dependencies, zero build tools.
 * Works seamlessly by opening index.html directly (file:// or web server).
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure data.js loaded successfully
  if (typeof portfolioData === 'undefined') {
    console.error('portfolioData is not defined. Ensure js/data.js is included before js/script.js.');
    return;
  }

  // Initialize all portfolio modules
  initTheme();
  initNavigation();
  renderHeroAndAbout();
  renderSkills();
  renderProjects();
  renderEducation();
  renderContact();
  initScrollAnimations();
  initBackToTop();
});

/* ====================================================================
   1. Theme Management (Dark Mode Default + LocalStorage)
   ==================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Update Icon and Accessible Label
  if (theme === 'light') {
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    themeToggleBtn.innerHTML = `
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    `;
  } else {
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    themeToggleBtn.setAttribute('title', 'Switch to light mode');
    themeToggleBtn.innerHTML = `
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    `;
  }
}

/* ====================================================================
   2. Sticky Navbar & Mobile Drawer
   ==================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      }
    });
  }
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const links = document.querySelectorAll(`.nav-link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      links.forEach(l => l.classList.add('active'));
    } else {
      links.forEach(l => l.classList.remove('active'));
    }
  });
}

/* ====================================================================
   3. Render Hero & About Content from data.js
   ==================================================================== */
function renderHeroAndAbout() {
  const { personal, about } = portfolioData;

  // Personal / Hero Elements
  const heroNameEl = document.getElementById('hero-name');
  const heroTaglineEl = document.getElementById('hero-tagline');
  const heroIntroEl = document.getElementById('hero-intro');
  const heroAvatarImg = document.getElementById('hero-avatar-img');
  const heroResumeBtn = document.getElementById('hero-resume-btn');

  if (heroNameEl) heroNameEl.textContent = personal.name;
  if (heroTaglineEl) heroTaglineEl.textContent = personal.tagline;
  if (heroIntroEl) heroIntroEl.textContent = personal.shortIntro;
  if (heroAvatarImg && personal.avatarUrl) {
    heroAvatarImg.src = personal.avatarUrl;
    heroAvatarImg.alt = `${personal.name} - Data Analyst`;
  }
  if (heroResumeBtn && personal.resumeUrl) {
    heroResumeBtn.href = personal.resumeUrl;
  }

  // Social Links in Hero
  const heroSocialsContainer = document.getElementById('hero-socials');
  if (heroSocialsContainer) {
    heroSocialsContainer.innerHTML = `
      <a href="${personal.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub Profile" title="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn Profile" title="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="mailto:${personal.email}" class="social-icon-btn" aria-label="Send Email" title="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </a>
    `;
  }

  // About Section Paragraphs
  const aboutBioContainer = document.getElementById('about-bio');
  if (aboutBioContainer && about.bio) {
    aboutBioContainer.innerHTML = about.bio
      .map(p => `<p class="about-text">${escapeHTML(p)}</p>`)
      .join('');
  }

  // About Section Learning Items
  const learningListEl = document.getElementById('learning-list');
  if (learningListEl && about.currentlyLearning) {
    learningListEl.innerHTML = about.currentlyLearning
      .map(item => `
        <li class="learning-item">
          <span class="learning-bullet">✦</span>
          <span>${escapeHTML(item)}</span>
        </li>
      `)
      .join('');
  }

  // About Section Highlights
  const highlightsContainer = document.getElementById('highlights-grid');
  if (highlightsContainer && about.highlights) {
    highlightsContainer.innerHTML = about.highlights
      .map(h => `
        <div class="highlight-card">
          <div class="highlight-icon">${h.icon}</div>
          <div class="highlight-title">${escapeHTML(h.title)}</div>
          <div class="highlight-detail">${escapeHTML(h.detail)}</div>
        </div>
      `)
      .join('');
  }
}

/* ====================================================================
   4. Render Skills Section
   ==================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || !portfolioData.skillCategories) return;

  container.innerHTML = portfolioData.skillCategories
    .map(category => `
      <div class="skill-category-card reveal">
        <div class="category-header">
          <h3 class="category-name">${escapeHTML(category.category)}</h3>
          <p class="category-desc">${escapeHTML(category.description)}</p>
        </div>
        <div class="skills-badge-list">
          ${category.skills.map(skill => `
            <div class="skill-row">
              <div class="skill-info">
                ${getSkillIconSvg(skill.name)}
                <div class="skill-title-group">
                  <span class="skill-name">${escapeHTML(skill.name)}</span>
                  <span class="skill-desc">${escapeHTML(skill.description)}</span>
                </div>
              </div>
              <span class="skill-level-tag">${escapeHTML(skill.level)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `)
    .join('');
}

// Crisp inline SVGs for skill technologies
function getSkillIconSvg(skillName) {
  const name = skillName.toLowerCase();

  if (name.includes('python')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="#38bdf8">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.906S0 5.766 0 11.875c0 6.11 3.406 5.894 3.406 5.894h2.031v-2.856s-.11-3.406 3.35-3.406h5.75v-.844h.028V5.8H8.813V2.625S8.813 0 11.914 0zM8.75 1.547a.938.938 0 110 1.875.938.938 0 010-1.875zm3.336 22.453c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.813v-.825h8.113s3.906.465 3.906-5.644c0-6.11-3.406-5.894-3.406-5.894h-2.031v2.856s.11 3.406-3.35 3.406h-5.75v.844h-.028V18.2h5.75v3.175s0 2.625-3.1 2.625zm3.164-1.547a.938.938 0 110-1.875.938.938 0 010 1.875z"/>
      </svg>`;
  }
  if (name.includes('sql')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>`;
  }
  if (name.includes('pandas') || name.includes('numpy')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>`;
  }
  if (name.includes('excel')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="17"/>
        <line x1="16" y1="13" x2="8" y2="17"/>
      </svg>`;
  }
  if (name.includes('power bi')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="#fbbf24">
        <rect x="3" y="12" width="4" height="9" rx="1"/>
        <rect x="10" y="8" width="4" height="13" rx="1"/>
        <rect x="17" y="3" width="4" height="18" rx="1"/>
      </svg>`;
  }
  if (name.includes('git')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="#f87171">
        <path d="M12 2a1 1 0 00-.71.29l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42l-9-9A1 1 0 0012 2zm3.5 10.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
      </svg>`;
  }
  if (name.includes('statistics') || name.includes('ml')) {
    return `
      <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
        <circle cx="12" cy="4" r="2" fill="#a78bfa"/>
        <circle cx="18" cy="10" r="2" fill="#a78bfa"/>
        <circle cx="6" cy="14" r="2" fill="#a78bfa"/>
      </svg>`;
  }

  // Default tech icon
  return `
    <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>`;
}

/* ====================================================================
   5. Render Projects Section with Filter by Tag
   ==================================================================== */
let currentFilterTag = 'All';

function renderProjects() {
  const filterContainer = document.getElementById('project-filters');
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid || !portfolioData.projects) return;

  // Extract all distinct tags
  const tagsSet = new Set(['All']);
  portfolioData.projects.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(t => tagsSet.add(t));
    }
  });

  const availableTags = Array.from(tagsSet);

  // Render Tag Filter Buttons
  if (filterContainer) {
    filterContainer.innerHTML = availableTags
      .map(tag => `
        <button 
          type="button" 
          class="filter-btn ${tag === currentFilterTag ? 'active' : ''}" 
          data-tag="${escapeHTML(tag)}">
          ${escapeHTML(tag)}
        </button>
      `)
      .join('');

    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedTag = btn.getAttribute('data-tag');
        currentFilterTag = selectedTag;

        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        filterAndDisplayProjects(selectedTag);
      });
    });
  }

  // Initial render
  filterAndDisplayProjects(currentFilterTag);
}

function filterAndDisplayProjects(tag) {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const filtered = tag === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.tags && p.tags.includes(tag));

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `
      <div class="project-empty-state">
        <p>No projects found matching the tag <strong>"${escapeHTML(tag)}"</strong>.</p>
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = filtered
    .map(project => `
      <article class="project-card reveal visible" data-id="${escapeHTML(project.id)}">
        <div class="project-header-bar">
          <svg class="project-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
          <div class="project-links">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" aria-label="GitHub Repository" title="GitHub Code">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            ` : ''}
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" aria-label="Live Demo or Documentation" title="Live Preview">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>

        <div class="project-body">
          <h3 class="project-title">${escapeHTML(project.title)}</h3>
          <p class="project-description">${escapeHTML(project.description)}</p>
          
          ${project.metric ? `
            <div class="project-metric">${escapeHTML(project.metric)}</div>
          ` : ''}

          <div class="project-tags">
            ${(project.tags || []).map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
          </div>
        </div>
      </article>
    `)
    .join('');
}

/* ====================================================================
   6. Render Education Timeline
   ==================================================================== */
function renderEducation() {
  const timelineContainer = document.getElementById('education-timeline');
  if (!timelineContainer || !portfolioData.education) return;

  timelineContainer.innerHTML = portfolioData.education
    .map(edu => `
      <div class="timeline-item reveal">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <div class="timeline-top">
            <span class="timeline-period">${escapeHTML(edu.period)}</span>
            <span class="timeline-status">${escapeHTML(edu.status)}</span>
          </div>
          <h3 class="timeline-degree">${escapeHTML(edu.degree)}</h3>
          <div class="timeline-institution">${escapeHTML(edu.institution)}</div>
          <p class="timeline-description">${escapeHTML(edu.description)}</p>
          ${edu.achievements && edu.achievements.length > 0 ? `
            <div class="timeline-bullets">
              ${edu.achievements.map(a => `
                <div class="timeline-bullet-item">${escapeHTML(a)}</div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `)
    .join('');
}

/* ====================================================================
   7. Render Contact Section & Formspree Form Integration
   ==================================================================== */
function renderContact() {
  const { personal } = portfolioData;

  const contactEmailEl = document.getElementById('contact-email-link');
  const contactLinkedinEl = document.getElementById('contact-linkedin-link');
  const contactGithubEl = document.getElementById('contact-github-link');
  const contactLocationEl = document.getElementById('contact-location-text');

  if (contactEmailEl) {
    contactEmailEl.href = `mailto:${personal.email}`;
    contactEmailEl.textContent = personal.email;
  }
  if (contactLinkedinEl) {
    contactLinkedinEl.href = personal.linkedin;
    contactLinkedinEl.textContent = personal.linkedin.replace(/^https?:\/\/(www\.)?/, '');
  }
  if (contactGithubEl) {
    contactGithubEl.href = personal.github;
    contactGithubEl.textContent = personal.github.replace(/^https?:\/\/(www\.)?/, '');
  }
  if (contactLocationEl) {
    contactLocationEl.textContent = personal.location;
  }

  // Contact Form Handling with Formspree
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    // Formspree action URL setup
    const formspreeEndpoint = (personal.formspreeId && personal.formspreeId !== 'your_form_id')
      ? `https://formspree.io/f/${personal.formspreeId}`
      : 'https://formspree.io/f/xbjnvzwq'; // Fallback endpoint or test

    contactForm.setAttribute('action', formspreeEndpoint);
    contactForm.setAttribute('method', 'POST');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!formStatus || !submitBtn) return;

      const formData = new FormData(contactForm);
      const originalBtnText = submitBtn.innerHTML;

      // Show submitting state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0110 10"/>
        </svg>
        Sending...
      `;

      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✓ Thank you! Your message has been sent successfully. I will get back to you soon.';
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data && data.errors) {
            formStatus.className = 'form-status error';
            formStatus.textContent = data.errors.map(err => err.message).join(', ');
          } else {
            throw new Error('Form submission failed.');
          }
        }
      } catch (err) {
        // Friendly fallback message if formspreeId isn't customized yet or network issue
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! There was an issue sending your message. Please reach out directly to ' + personal.email;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
}

/* ====================================================================
   8. Intersection Observer Fade-in Animation
   ==================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ====================================================================
   9. Back to Top Smooth Button
   ==================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ====================================================================
   10. Security Helper: Escape HTML Strings
   ==================================================================== */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
