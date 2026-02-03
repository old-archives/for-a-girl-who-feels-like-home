/* ===== SELECT ELEMENTS ===== */
const screens = document.querySelectorAll('.screen');
const overlay = document.getElementById('startOverlay');
const music = document.getElementById('bgMusic');
const particlesBox = document.getElementById('particles');

/* ===== MUSIC START (iOS SAFE) ===== */
overlay.addEventListener('click', () => {
  music.volume = 0.45;
  music.play().then(() => {
    overlay.style.display = 'none';
  }).catch(err => {
    console.log('Music play blocked:', err);
  });
});

/* ===== SECTION OBSERVER ===== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        /* Breathing text (skip silence) */
        // animate all paragraphs inside section
const texts = entry.target.querySelectorAll('p');
texts.forEach((p, i) => {
  setTimeout(() => {
    p.classList.add('breathing');
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  }, i * 180);
});

        /* Photo reveal (landscape / portrait) */
        const frame = entry.target.querySelector('.photo-frame');
        if (frame) {
          frame.style.opacity = '1';
          frame.style.transform = 'scale(1)';
        }
      }
    });
  },
  { threshold: 0.6 }
);

screens.forEach(screen => observer.observe(screen));

/* ===== CINEMATIC FLOATING PARTICLES ===== */
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';

  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = 16 + Math.random() * 12 + 's';
  p.style.width = p.style.height = 4 + Math.random() * 4 + 'px';

  particlesBox.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, 30000);
}

/* Start particles slowly */
setInterval(createParticle, 1000);

/* PROPOSAL INTERACTION */
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

if (yesBtn && noBtn) {

  const yesImageBox = document.getElementById('yesImageBox');

yesBtn.addEventListener('click', () => {
  response.textContent = "You already were. Always.";
  response.style.opacity = '1';

  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';

  // show image
  if (yesImageBox) {
    setTimeout(() => {
      yesImageBox.classList.add('show');
    }, 800);
  }

  // soften music
  if (music) {
    music.volume = 0.25;
  }
});
    	

    

  noBtn.addEventListener('mouseover', () => {
    noBtn.style.transform = `translateX(${Math.random() * 60 - 30}px)`;
  });

}
/* DREAMY LIGHT DUST */
setInterval(() => {
  const d = document.createElement('div');
  d.className = 'dust';
  d.style.left = Math.random() * 100 + 'vw';
  d.style.animationDuration = (18 + Math.random() * 12) + 's';
  document.body.appendChild(d);

  setTimeout(() => d.remove(), 30000);
}, 900);
/* CONSTELLATION STARS */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
  });

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = 'rgba(255,180,220,0.15)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
}
setInterval(drawStars, 120);