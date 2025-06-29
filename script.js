// Animated background: Simple particles effect
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  document.getElementById('animated-bg').appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  const numParticles = 60;
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.5 + Math.random() * 2.5,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      alpha: 0.3 + Math.random() * 0.7
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#00eaff';
      ctx.shadowColor = '#00eaff';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    }
    connectParticles();
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = 0.08;
          ctx.strokeStyle = '#00eaff';
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    draw();
    requestAnimationFrame(animate);
  }
  animate();
}

function typewriterEffect(element, text, speed = 80, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  element.textContent = '';
  type();
}

function typewriterLoop(element, texts, speed = 80, pause = 1200) {
  let idx = 0;
  function loop() {
    element.textContent = '';
    let text = texts[idx];
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          idx = (idx + 1) % texts.length;
          loop();
        }, pause);
      }
    }
    type();
  }
  loop();
}

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('theme-icon').textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    document.getElementById('theme-icon').textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

window.addEventListener('DOMContentLoaded', () => {
  createParticles();

  // Theme switcher
  const themeSwitcher = document.getElementById('theme-switcher');
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  // Typewriter for name
  const nameEl = document.getElementById('typewriter-name');
  if (nameEl) {
    typewriterEffect(nameEl, "Aabiskar7Q", 90);
  }

  // Typewriter for title
  const titleEl = document.getElementById('typewriter-title');
  if (titleEl) {
    typewriterLoop(titleEl, ["Roblox Scripter", "Roblox Developer"], 70, 1200);
  }

  // Home page hero socials
  if (document.getElementById('hero-socials')) {
    const heroSocials = [
      { name: 'Gmail', url: 'mailto:timilsinaaabiskar218@gmail.com', icon: 'gmail.png', alt: 'Gmail' },
      { name: 'X', url: 'https://x.com/Aabiskar7Q', icon: 'X.ico', alt: 'X' },
      { name: 'Discord', url: 'https://discord.gg/jvFgXQer4P', icon: 'dc.ico', alt: 'Discord' },
      { name: 'YouTube', url: 'https://www.youtube.com/@7QTECH', icon: 'Youtube.ico', alt: 'YouTube' },
      { name: 'Roblox', url: 'https://www.roblox.com/users/3267169381/profile', icon: 'Roblox.ico', alt: 'Roblox' },
    ];
    const socialsDiv = document.getElementById('hero-socials');
    heroSocials.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.title = link.name;
      const img = document.createElement('img');
      img.src = link.icon;
      img.alt = link.alt;
      img.style.width = '28px';
      img.style.height = '28px';
      img.style.display = 'block';
      a.appendChild(img);
      // Add click/touch animation
      a.addEventListener('pointerdown', () => {
        a.style.transform = 'scale(0.92) rotate(-6deg)';
      });
      a.addEventListener('pointerup', () => {
        a.style.transform = '';
      });
      a.addEventListener('mouseleave', () => {
        a.style.transform = '';
      });
      socialsDiv.appendChild(a);
    });
  }

  // Projects section (single page)
  if (document.getElementById('projects-list')) {
    fetch('projects.json')
      .then(res => res.json())
      .then(projects => {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = "";
        projects.forEach(project => {
          const projectDiv = document.createElement('div');
          projectDiv.className = 'project-item';
          const title = document.createElement('h3');
          title.textContent = project.title;
          projectDiv.appendChild(title);
          if (project.video) {
            let videoUrl = project.video;
            // Convert YouTube shareable link to embed link if needed
            if (videoUrl.includes('youtu.be/')) {
              const id = videoUrl.split('youtu.be/')[1].split(/[?&]/)[0];
              videoUrl = `https://www.youtube.com/embed/${id}`;
            } else if (videoUrl.includes('youtube.com/watch?v=')) {
              const id = videoUrl.split('v=')[1].split('&')[0];
              videoUrl = `https://www.youtube.com/embed/${id}`;
            }
            if (videoUrl.includes('youtube.com/embed/')) {
              const iframe = document.createElement('iframe');
              iframe.src = videoUrl;
              iframe.width = "300";
              iframe.height = "170";
              iframe.frameBorder = "0";
              iframe.allowFullscreen = true;
              iframe.allow = "autoplay; encrypted-media";
              projectDiv.appendChild(iframe);
            } else {
              const video = document.createElement('video');
              video.src = videoUrl;
              video.controls = true;
              video.width = 300;
              projectDiv.appendChild(video);
            }
          }
          projectsList.appendChild(projectDiv);
        });
      })
      .catch(err => {
        document.getElementById('projects-list').textContent = "Failed to load projects.";
        console.error(err);
      });
  }

  // Contact links
  if (document.getElementById('contact-links')) {
    const contactLinks = [
      { name: 'Gmail', url: 'mailto:timilsinaaabiskar218@gmail.com', icon: 'gmail.png', alt: 'Gmail' },
      { name: 'X', url: 'https://x.com/Aabiskar7Q', icon: 'X.ico', alt: 'X' },
      { name: 'Discord', url: 'https://discord.gg/jvFgXQer4P', icon: 'dc.ico', alt: 'Discord' },
      { name: 'YouTube', url: 'https://www.youtube.com/@7QTECH', icon: 'Youtube.ico', alt: 'YouTube' },
      { name: 'Roblox', url: 'https://www.roblox.com/users/3267169381/profile', icon: 'Roblox.ico', alt: 'Roblox' },
    ];
    const contactDiv = document.getElementById('contact-links');
    contactLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.title = link.name;
      const img = document.createElement('img');
      img.src = link.icon;
      img.alt = link.alt;
      img.style.width = '32px';
      img.style.height = '32px';
      img.style.display = 'block';
      a.appendChild(img);
      a.addEventListener('pointerdown', () => {
        a.style.transform = 'scale(0.92) rotate(-6deg)';
      });
      a.addEventListener('pointerup', () => {
        a.style.transform = '';
      });
      a.addEventListener('mouseleave', () => {
        a.style.transform = '';
      });
      contactDiv.appendChild(a);
    });
  }

  // Smooth scroll for navbar links
  document.querySelectorAll('.modern-navbar a, .hero-buttons a, .contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scrollspy: highlight active navbar link
  const navLinks = document.querySelectorAll('.modern-navbar a');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function onScroll() {
    const scrollPos = window.scrollY + 80;
    let currentSection = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    }
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${currentSection.id}`);
    if (activeLink) activeLink.classList.add('active');
  }
  window.addEventListener('scroll', onScroll);
  onScroll(); // Set on load

  // Animate on scroll (scroll-triggered animations)
  function animateOnScroll() {
    // Animate cards and sections
    document.querySelectorAll('.animated-card, .project-item, .service-card, .hero-section, section').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
    // Animate section headings
    document.querySelectorAll('section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
}); 