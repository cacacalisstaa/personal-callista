/* =============================================
   CALLISTA PUTRI RELVIAN – PORTFOLIO WEBSITE
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Animate skill progress bars ──────────────────────
  const fills = document.querySelectorAll('.skill-fill');
  if (fills.length) {
    const animateBars = () => {
      fills.forEach(fill => {
        const target = fill.getAttribute('data-width');
        fill.style.width = target + '%';
      });
    };

    // Use IntersectionObserver to trigger on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateBars, 200);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const barsWrapper = document.querySelector('.skills-bars');
    if (barsWrapper) observer.observe(barsWrapper);
    else animateBars(); // fallback
  }

  // ── 2. Fade-in on scroll ─────────────────────────────────
  const fadeEls = document.querySelectorAll(
    '.hero-left, .hero-right, .portfolio-card, .skill-card, .hobi-item, .cv-paper, .about-block'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ── 3. Stagger hero elements on home page ───────────────
  const heroLeft = document.querySelector('.hero-left');
  if (heroLeft) {
    const children = heroLeft.children;
    Array.from(children).forEach((child, i) => {
      child.style.animationDelay = `${i * 0.1}s`;
    });
  }

  // ── 4. Active nav link highlight based on scroll ────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const navClickHandler = (targetLink) => {
    navLinks.forEach(link => link.classList.remove('active'));
    targetLink.classList.add('active');
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      navClickHandler(link);
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

 const introOverlay = document.getElementById('introOverlay');
  const startButton = document.getElementById('startButton');

  if (startButton && introOverlay) {
    startButton.addEventListener('click', () => {
      introOverlay.classList.add('hidden');
      setTimeout(() => {
        if (introOverlay && introOverlay.parentNode) {
          introOverlay.parentNode.removeChild(introOverlay);
        }
        startTypingAnimation();
      }, 600);
    });
  }

  // Kunci scroll sampai klik View Details (hanya di desktop)
  if (window.innerWidth > 900) {
    document.body.classList.add('no-scroll');
  }

  const viewDetailsBtn = document.getElementById('viewDetailsBtn');
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.remove('no-scroll');
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── 5. Typing animation for hero description ────────────────────────
  function startTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (typingText) {
      const fullText = "Saya Callista (Callis), siswi SMK Negeri 7 jurusan SIJA yang tertarik pada dunia teknologi, khususnya dalam membangun dan mengembangkan sistem serta website yang bermanfaat.";
      let index = 0;
      const typingSpeed = 30; // ms per character

      function typeWriter() {
        if (index < fullText.length) {
          typingText.innerHTML += fullText.charAt(index);
          index++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          // Add blinking cursor after typing is done
          typingText.innerHTML += '<span class="cursor">|</span>';
          setInterval(() => {
            const cursor = typingText.querySelector('.cursor');
            if (cursor) {
              cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
          }, 500);
        }
      }

      typeWriter(); // Start immediately
    }
  }

});
// ── 6. Typing animation for Riwayat Keluarga ────────────────────────
  const blocks = document.querySelectorAll('.about-block');
  blocks.forEach(block => {
    const h2 = block.querySelector('.about-sub');
    if (h2 && h2.textContent.trim() === 'Riwayat Keluarga') {
      const targetP = block.querySelector('.about-text');
      if (!targetP) return;

      const fullText = "Saya merupakan anak tunggal dalam keluarga. Saya dibesarkan oleh kedua orang tua yang selalu memberikan dukungan penuh dalam pendidikan dan pengembangan diri saya. Sebagai anak tunggal, saya terbiasa untuk mandiri, bertanggung jawab, dan mampu mengelola berbagai hal secara sendiri dengan baik.";

      targetP.innerHTML = '';
      let hasStarted = false;

      function startRiwayatTyping() {
        if (hasStarted) return;
        hasStarted = true;

        let index = 0;
        const typingSpeed = 30;

        function typeWriter() {
          if (index < fullText.length) {
            targetP.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
          } else {
            targetP.innerHTML += '<span class="cursor">|</span>';
            setInterval(() => {
              const cursor = targetP.querySelector('.cursor');
              if (cursor) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
              }
            }, 500);
          }
        }

        typeWriter();
      }

      block.addEventListener('click', startRiwayatTyping);
      block.addEventListener('touchstart', startRiwayatTyping);
    }
  });
  // ── 7. Education timeline click ────────────────────────
  const eduItems = document.querySelectorAll('.edu-item');
  eduItems.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      eduItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
  // ── 8. View All education ────────────────────────
  const viewAllBtn = document.getElementById('eduViewAll');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.edu-item').forEach(item => {
        item.classList.add('open');
      });
      viewAllBtn.style.display = 'none';
    });
  }

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

function openPhoto() {
  document.getElementById('photoModal').classList.add('active');
}

function closePhoto(e) {
  if (!document.querySelector('.photo-modal-inner').contains(e.target)) {
    document.getElementById('photoModal').classList.remove('active');
  }
}
function openSingle(src, e) {
  e.stopPropagation();
  document.getElementById('singleImg').src = src;
  document.getElementById('singleModal').classList.add('active');
}

function closeSingle() {
  document.getElementById('singleModal').classList.remove('active');
}