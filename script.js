const screens = document.querySelectorAll('.screen');
const music = document.getElementById('bgMusic');

let silenceDone = false;
let musicStarted = false;

// START MUSIC ON FIRST TOUCH (iOS SAFE)
document.body.addEventListener('click', () => {
  if (!musicStarted) {
    music.volume = 0;
    music.play().then(() => {
      musicStarted = true;
      fadeInMusic();
    });
  }
}, { once: true });

// FADE IN MUSIC
function fadeInMusic() {
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const text = entry.target.querySelector('p');
        if (text && !entry.target.classList.contains('silence')) {
          text.classList.add('breathing');
        }

        // SILENCE SECTION LOGIC
        if (entry.target.classList.contains('silence') && !silenceDone) {
          silenceDone = true;

          // pause music
          if (!music.paused) music.pause();

          setTimeout(() => {
            // resume music softly
            if (musicStarted) music.play();
          }, 3000);
        }
      }
    });
  },
  { threshold: 0.8 }
);

screens.forEach(screen => observer.observe(screen));