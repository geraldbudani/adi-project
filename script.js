/* ============================================
   Peter Lukani Photography — script.js
   ============================================ */

// === CUSTOM CURSOR ===
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
    cursor.style.left     = e.clientX + 'px';
    cursor.style.top      = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
});


// === LOADING SCREEN ===
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1800);
});


// === STICKY HEADER ===
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 80);
});


// === MOBILE NAV ===
function toggleNav() {
    const hamburger = document.getElementById('hamburger');
    const overlay   = document.getElementById('navOverlay');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
}

function closeNav() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
    document.body.style.overflow = '';
}


// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeNav();
    });
});


// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// === COUNT-UP ANIMATION ===
const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.count);
        let current  = 0;
        const step   = Math.ceil(target / 50);

        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            // No '+' suffix for small single-digit counts (Years, Categories)
            el.textContent = current + (target <= 9 ? '' : '+');
            if (current >= target) clearInterval(timer);
        }, 30);

        countObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));


// === LIGHTBOX ===
const categoryIcons = {
    'Celebretes': '🎉',
    'Models':     '👤',
    'Couples':    '💑',
    'Places':     '🏛️',
    'Animals':    '🐾',
    'Vehicles':   '🚗',
    'Gym':        '💪',
    'Random':     '🎞️',
    'Valeria':    '✨'
};

function openLightbox(name, subtitle) {
    document.getElementById('lightboxTitle').textContent    = name;
    document.getElementById('lightboxSubtitle').textContent = subtitle;

    const grid = document.getElementById('lightboxGrid');
    grid.innerHTML = '';

    for (let i = 1; i <= 12; i++) {
        const num = String(i).padStart(2, '0');
        grid.innerHTML += `
            <div class="lightbox-item" data-n="${num}">
                <div class="lightbox-item-placeholder">
                    ${categoryIcons[name] || '📸'}
                </div>
                <!--
                Replace the placeholder div above with a real image:
                <img src="fotot/${name.toLowerCase()}/IMG_${i}.JPG"
                     style="width:100%;height:100%;object-fit:cover"
                     onerror="this.parentElement.style.display='none'">
                -->
            </div>`;
    }

    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// Close on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});


// === BOOKING FORM ===
function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fname || !email) {
        alert('Please fill in your name and email.');
        return;
    }

    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
}