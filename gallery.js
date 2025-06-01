// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Create Animated Rangoli Background
const rangoliBg = document.getElementById('rangoliBg');
for (let i = 0; i < 12; i++) {
    const rangoli = document.createElement('div');
    rangoli.className = 'rangoli-pattern';
    rangoli.style.left = `${Math.random() * 100}%`;
    rangoli.style.top = `${Math.random() * 100}%`;
    rangoli.style.width = `${100 + Math.random() * 200}px`;
    rangoli.style.height = rangoli.style.width;
    rangoli.style.animationDelay = `${Math.random() * 20}s`;
    rangoli.style.opacity = 0.1 + Math.random() * 0.2;
    rangoliBg.appendChild(rangoli);
}

// Gallery Data
const galleryData = [
    {
        image: "https://tse2.mm.bing.net/th?id=OIP.d8D7W6j7bxV_JySNPbLUCwHaFi&pid=Api&P=0&h=220",
        title: "Royal Wedding Ceremony",
        category: "weddings",
        description: "Traditional Hindu wedding with peacock-themed decor in Udaipur"
    },
    {
        image: "https://i.pinimg.com/originals/03/33/ab/0333ab7c4bb2014fa1acbf10db22bc05.jpg",
        title: "Grand Birthday Celebration",
        category: "birthdays",
        description: "50th birthday party with Indian fusion theme"
    },
    {
        image: "https://tse1.mm.bing.net/th?id=OIP.dKEfd0i2GsfPOel7KB2CJAHaEO&pid=Api&P=0&h=220",
        title: "Corporate Gala Night",
        category: "corporate",
        description: "Annual corporate event with cultural performances"
    },
    {
        image: "https://tse2.mm.bing.net/th?id=OIP.F__tu-syzySoZw2NmrmEkwHaE8&pid=Api&P=0&h=220",
        title: "Family Gathering",
        category: "social",
        description: "Intimate family function with traditional decorations"
    },
    {
        image: "https://tse3.mm.bing.net/th?id=OIP.oo0KYe8nnu1XuKV7n5Y_vgHaKX&pid=Api&P=0&h=220",
        title: "Cultural Dance Performance",
        category: "cultural",
        description: "Kathak dance recital at heritage venue"
    },
    {
        image: "https://tse3.mm.bing.net/th?id=OIP.2yR-drC95djlNn0w5X_9nAHaE8&pid=Api&P=0&h=220",
        title: "Baby Shower Celebration",
        category: "social",
        description: "Traditional Indian baby shower with modern touches"
    },
    {
        image: "https://tse3.mm.bing.net/th?id=OIP.aO6f6E-HUoydLO5nqLoxQgHaE7&pid=Api&P=0&h=220",
        title: "Diwali Festival",
        category: "festivals",
        description: "Grand Diwali celebration with 1000 diyas"
    },
    {
        image: "https://tse2.mm.bing.net/th?id=OIP.NbHuKAdCFzVK05Kh-rKLfAHaE7&pid=Api&P=0&h=220",
        title: "Holi Festival",
        category: "festivals",
        description: "Colorful Holi celebration with organic colors"
    },
    {
        image: "https://tse4.mm.bing.net/th?id=OIP.0fascz1RXBtOhxeCt-QRUAHaEB&pid=Api&P=0&h=220",
        title: "Navratri Garba",
        category: "festivals",
        description: "Nine nights of traditional Garba dance"
    },
    {
        image: "https://tse1.mm.bing.net/th?id=OIP.HlvbiS_g9K9C1A7XSj2-xgHaE8&pid=Api&P=0&h=220",
        title: "Sangeet Night",
        category: "weddings",
        description: "Pre-wedding musical celebration"
    },
    {
        image: "https://tse3.mm.bing.net/th?id=OIP.pWR8uNXoBO5DCH3418AvBwHaE6&pid=Api&P=0&h=220",
        title: "Mehndi Ceremony",
        category: "weddings",
        description: "Traditional henna application ceremony"
    },
    {
        image: "https://tse1.mm.bing.net/th?id=OIP.DjCs_AYzvjK-8jMy-bftEgHaEL&pid=Api&P=0&h=220",
        title: "Corporate Awards",
        category: "corporate",
        description: "Annual recognition event with Indian theme"
    }
];

// Get unique categories for filters
const categories = ['all', ...new Set(galleryData.map(item => item.category))];

// Load Gallery Filters
const galleryFilters = document.getElementById('galleryFilters');
function loadFilters() {
    galleryFilters.innerHTML = '';
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
        filterBtn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        filterBtn.dataset.category = category;
        filterBtn.addEventListener('click', filterGallery);
        galleryFilters.appendChild(filterBtn);
    });
}

// Load Gallery Items
const galleryGrid = document.getElementById('galleryGrid');
let currentItems = [];

function loadGallery(category = 'all') {
    galleryGrid.innerHTML = '';
    currentItems = category === 'all' 
        ? [...galleryData] 
        : galleryData.filter(item => item.category === category);
    
    currentItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="gallery-image">
            <div class="gallery-overlay">
                <h3 class="gallery-title">${item.title}</h3>
                <p class="gallery-category">
                    <i class="fas fa-tag"></i> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
        
        // Trigger animation
        setTimeout(() => {
            galleryItem.classList.add('visible');
        }, 50);
    });
}

// Filter Gallery
function filterGallery(e) {
    const category = e.target.dataset.category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Reload gallery with filtered items
    loadGallery(category);
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const imageInfo = document.getElementById('imageInfo');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    const item = currentItems[currentImageIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    imageInfo.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p><i class="fas fa-tag"></i> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
    `;
}

function navigate(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentItems.length - 1;
    } else if (currentImageIndex >= currentItems.length) {
        currentImageIndex = 0;
    }
    
    updateLightbox();
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigate(-1);
    } else if (e.key === 'ArrowRight') {
        navigate(1);
    }
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFilters();
    loadGallery();
    
    // Add scroll animation for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.style.background = window.scrollY > 50 
            ? 'rgba(255, 249, 245, 0.98)' 
            : 'rgba(255, 249, 245, 0.96)';
    });
    
    // Intersection Observer for gallery items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
});
 