// ======================== GLOBAL VARIABLES ========================
const DOM = {
  // Preloader
  preloader: document.querySelector('.preloader'),
  
  // Navigation
  mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
  navLinks: document.querySelector('.nav-links'),
  
  // Hero Section
  heroTitleWords: document.querySelectorAll('.title-word'),
  rotatingCard: document.querySelector('.rotating-card'),
  
  // Events
  liveEventsGrid: document.getElementById('liveEventsGrid'),
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  
  // Locations
  locationPoints: document.querySelectorAll('.location-point'),
  locationInfo: document.getElementById('locationInfo'),
  
  // Testimonials
  testimonialTrack: document.getElementById('testimonialTrack'),
  prevBtn: document.querySelector('.prev-btn'),
  nextBtn: document.querySelector('.next-btn'),
  
  // Music Player
  musicToggle: document.getElementById('musicToggle'),
  culturalMusic: document.getElementById('culturalMusic'),
  
  // Countdown
  countdownDays: document.querySelector('.days'),
  countdownHours: document.querySelector('.hours'),
  countdownMins: document.querySelector('.minutes'),
  countdownSecs: document.querySelector('.seconds'),
  festivalName: document.querySelector('.festival-name'),
  
  // Newsletter
  newsletterForm: document.getElementById('newsletterForm')
};

// ======================== INITIALIZATION ========================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMobileMenu();
  initHeroAnimations();
  initLiveEvents();
  initEventTabs();
  initLocationMap();
  initTestimonialSlider();
  initMusicPlayer();
  initFestivalCountdown();
  initNewsletter();
  initPetalAnimation();
});

// ======================== MODULE FUNCTIONS ========================

// 1. PRELOADER
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      DOM.preloader.style.opacity = '0';
      setTimeout(() => {
        DOM.preloader.style.display = 'none';
      }, 1000);
    }, 2000);
  });
}

// 2. MOBILE MENU TOGGLE
function initMobileMenu() {
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.navLinks.classList.toggle('active');
    DOM.mobileMenuBtn.classList.toggle('active');
  });
}

// 3. HERO ANIMATIONS
function initHeroAnimations() {
  // Animate title words
  DOM.heroTitleWords.forEach((word, i) => {
    setTimeout(() => {
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    }, i * 300);
  });

  // 3D Card Rotation
  if (DOM.rotatingCard) {
    DOM.rotatingCard.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      DOM.rotatingCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    DOM.rotatingCard.addEventListener('mouseleave', () => {
      DOM.rotatingCard.style.transform = 'rotateY(0) rotateX(0)';
    });
  }
}

// 4. LIVE EVENTS LOADER
async function initLiveEvents() {
  const events = [
    {
      id: 1,
      title: "Royal Wedding",
      location: "Udaipur",
      date: "2023-12-15",
      image: "https://tse1.mm.bing.net/th?id=OIP.N3bX0Dnirl2I7jyj6hg1sQHaEg&pid=Api&P=0&h=220"
    },
    // Add 5-6 more events...
  ];

  DOM.liveEventsGrid.innerHTML = events.map(event => `
    <div class="event-card" data-id="${event.id}">
      <div class="event-badge">Live</div>
      <img src="${event.image}" alt="${event.title}">
      <div class="event-details">
        <h3>${event.title}</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <p><i class="fas fa-calendar-alt"></i> ${new Date(event.date).toLocaleDateString()}</p>
      </div>
    </div>
  `).join('');

  // Add hover effects
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('img').style.transform = 'scale(1.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img').style.transform = 'scale(1)';
    });
  });
}

// 5. EVENT TABS SYSTEM
function initEventTabs() {
  DOM.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      DOM.tabBtns.forEach(b => b.classList.remove('active'));
      DOM.tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// 6. INTERACTIVE LOCATION MAP
function initLocationMap() {
  const locationData = {
    Jaipur: {
      venues: ["Rambagh Palace", "Jai Mahal Palace"],
      weather: "Sunny"
    },
    // Add other locations...
  };

  DOM.locationPoints.forEach(point => {
    point.addEventListener('click', () => {
      const city = point.getAttribute('data-city');
      const data = locationData[city];
      
      DOM.locationInfo.innerHTML = `
        <div class="info-content">
          <h3>${city}</h3>
          <p><i class="fas fa-umbrella-beach"></i> Popular Venues: ${data.venues.join(', ')}</p>
          <p><i class="fas fa-cloud-sun"></i> Weather: ${data.weather}</p>
          <a href="#" class="view-venues">View Venues</a>
        </div>
      `;
    });
  });
}

// 7. TESTIMONIAL SLIDER
function initTestimonialSlider() {
  const testimonials = [
    {
      quote: "BharatEvents made our wedding magical!",
      author: "Priya & Rohan"
    },
    // Add 5-6 more testimonials...
  ];

  // Load testimonials
  DOM.testimonialTrack.innerHTML = testimonials.map(testimonial => `
    <div class="testimonial-card">
      <p>"${testimonial.quote}"</p>
      <h4>- ${testimonial.author}</h4>
    </div>
  `).join('');

  // Slider functionality
  let currentIndex = 0;
  const cardWidth = 300;
  const gap = 20;

  DOM.nextBtn.addEventListener('click', () => {
    if (currentIndex < testimonials.length - 1) {
      currentIndex++;
      DOM.testimonialTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }
  });

  DOM.prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      DOM.testimonialTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }
  });
}

// 8. CULTURAL MUSIC PLAYER
function initMusicPlayer() {
  DOM.musicToggle.addEventListener('click', () => {
    if (DOM.culturalMusic.paused) {
      DOM.culturalMusic.play();
      DOM.musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause BGM</span>';
    } else {
      DOM.culturalMusic.pause();
      DOM.musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Play BGM</span>';
    }
  });
}

// 9. FESTIVAL COUNTDOWN
function initFestivalCountdown() {
  const festivals = [
    { name: "Diwali", date: "2023-11-12" },
    { name: "Holi", date: "2024-03-25" }
  ];

  // Find next festival
  const now = new Date();
  const nextFestival = festivals.find(f => new Date(f.date) > now) || festivals[0];

  DOM.festivalName.textContent = nextFestival.name;

  function updateCountdown() {
    const targetDate = new Date(nextFestival.date).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    DOM.countdownDays.textContent = days.toString().padStart(2, '0');
    DOM.countdownHours.textContent = hours.toString().padStart(2, '0');
    DOM.countdownMins.textContent = mins.toString().padStart(2, '0');
    DOM.countdownSecs.textContent = secs.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 10. NEWSLETTER FORM
function initNewsletter() {
  DOM.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = DOM.newsletterForm.querySelector('input').value;
    
    // Simulate API call
    setTimeout(() => {
      DOM.newsletterForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <p>Thank you for subscribing!</p>
        </div>
      `;
    }, 1000);
  });
}

// 11. FLOATING PETALS ANIMATION
function initPetalAnimation() {
  const petalsContainer = document.querySelector('.petals-container');
  const petalCount = 15;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${10 + Math.random() * 20}s`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    petal.style.opacity = Math.random();
    petal.style.transform = `scale(${0.5 + Math.random()})`;
    petalsContainer.appendChild(petal);
  }
}

// ======================== UTILITY FUNCTIONS ========================
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Responsive adjustments here
}));