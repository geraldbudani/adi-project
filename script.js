/* Peter Lukani Photography — script.js */

// ── CUSTOM CURSOR ──────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
    cursor.style.left      = e.clientX + 'px';
    cursor.style.top       = e.clientY + 'px';
    cursorRing.style.left  = e.clientX + 'px';
    cursorRing.style.top   = e.clientY + 'px';
});

// ── LOADER ─────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1600);
});

// ── STICKY HEADER ──────────────────────────────
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 80);
});

// ── MOBILE NAV ─────────────────────────────────
function toggleNav() {
    const h = document.getElementById('hamburger');
    const o = document.getElementById('navOverlay');
    h.classList.toggle('open');
    o.classList.toggle('open');
    document.body.style.overflow = o.classList.contains('open') ? 'hidden' : '';
}
function closeNav() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ── SMOOTH SCROLL ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeNav();
    });
});

// ── SCROLL REVEAL ──────────────────────────────
new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 }).observe
    ? (() => {
        const ro = new IntersectionObserver(entries =>
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    })()
    : document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// ── COUNT-UP ───────────────────────────────────
const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let cur = 0;
        const step = Math.ceil(target / 50);
        const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur + (target <= 9 ? '' : '+');
            if (cur >= target) clearInterval(t);
        }, 28);
        countObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// ── LIGHTBOX ───────────────────────────────────
// Add or remove filenames here to match exactly what's on disk.
// File names ARE case-sensitive on Linux servers — match exactly.
const categoryPhotos = {
    'Celebretes': [
        'assests/celebretes/IMG_0927.JPG',
        'assests/celebretes/IMG_0945.JPG',
        'assests/celebretes/IMG_1216.JPG',
        'assests/celebretes/IMG_1298.JPG',
        'assests/celebretes/IMG_1615.JPG',
        'assests/celebretes/IMG_1623.JPG',
        'assests/celebretes/IMG_1624.JPG',
        'assests/celebretes/IMG_1865.JPG',
        'assests/celebretes/IMG_1948.JPG',
        'assests/celebretes/IMG_1984.JPG',
        'assests/celebretes/IMG_3019.JPG',
    ],
    'Models': [
        'assests/models/0C55E1FE-F210-4AD8-A16E-BF5768E8F94F.JPEG',
        'assests/models/16F6F563-C254-4863-AF05-2938BFF57C54.JPEG',
        'assests/models/262F5DA5-BCE8-454D-93B0-D129F938C87E.JPEG',
        'assests/models/315DAAF1-8BC6-4897-9C8D-C9C99CB50DA9.JPEG',
        'assests/models/37C0AC37-C8F5-46CC-BC2A-66A322EB944C.JPEG',
        'assests/models/3D4B0F09-8C37-4A1C-97F7-8069068A776E.JPEG',
        'assests/models/4C06E509-6B62-4C6D-8F4C-3EDF55015B44.JPEG',
        'assests/models/AEF5452F-2549-47EF-93BE-E9E4AEC24C50.JPEG',
        'assests/models/cover.JPG',
        'assests/models/IMG_0174.JPG',
        'assests/models/IMG_5270.JPG',
        'assests/models/IMG_6076.JPG',
    ],
    'Couples': [
       'assests/couples/775C1A97-8311-46D3-9550-EC2BA2F1FCA6.JPEG',
        'assests/couples/82601EE1-2EAE-4267-8FC8-6DD6B2FEB5DB.JPEG',
        'assests/couples/cover.JPG',
        'assests/couples/IMG_2661.JPG',
        'assests/couples/IMG_3370.JPG',
        'assests/couples/IMG_6498.JPG',
        'assests/couples/IMG_8433.JPG',
        'assests/couples/IMG_8513.JPG',
        'assests/couples/IMG_8692.JPG',
    ],
    'Places': [
       'assests/places/20D36F73-C5EA-4C72-A0D8-D7C0C11309C0.JPG',
        'assests/places/23C7D3FD-3862-46DE-ADB0-1858205AEAE2.JPEG',
        'assests/places/46C4E41E-8D78-4974-85A3-C4C717467223.JPG',
        'assests/places/5E2C6060-E7AE-49CC-B8CC-4FF9C37E92C3.JPG',
        'assests/places/cover.JPG',
        'assests/places/IMG_2429.jpg',
        'assests/places/IMG_3260.JPG',
        'assests/places/IMG_3276.JPG',
        'assests/places/IMG_3491.JPG',
        'assests/places/IMG_5093.JPG',
        'assests/places/IMG_5854_jpg.JPG',
    ],
    'Animals': [
        'assests/animals/Img1.JPG',
        'assests/animals/Img2.jpg',
        'assests/animals/Img3.jpg',
        'assests/animals/Img4.jpg',
        'assests/animals/Img5.jpg',
        'assests/animals/Img6.jpg',
        'assests/animals/Img7.jpg',
        'assests/animals/Img8.jpg',
        'assests/animals/img9.jpg',   // note: lowercase 'img' — exactly as on disk
        'assests/animals/Img10.jpg',
        'assests/animals/Img11.JPG',
        'assests/animals/Img12.JPG',
        'assests/animals/Img13.JPG',
        'assests/animals/Img14.JPG',
    ],
    'Vehicles': [
        'assests/vehichles/cover.JPG',
        'assests/vehichles/IMG_0282.JPG',
        'assests/vehichles/IMG_2670.JPG',
        'assests/vehichles/IMG_4655.JPG',
        'assests/vehichles/IMG_5013.JPG',
        'assests/vehichles/IMG_5897.JPG',
        'assests/vehichles/IMG_7030.JPG',
        'assests/vehichles/IMG_7738.JPG',
        'assests/vehichles/IMG_7944.JPG',
        'assests/vehichles/IMG_8613_jpg.JPG',
        'assests/vehichles/ld-export-93a4d42c-09152023.JPG',
        'assests/vehichles/ld-export-f834ba28-09152023.JPG',
    ],
    'Gym': [
        'assests/gym/cover.JPG',
        'assests/gym/ld-export-014e28de-09032023.JPG',
        'assests/gym/ld-export-0652ec1f-09032023.JPG',
        'assests/gym/ld-export-2d8b5600-09032023.JPG',
        'assests/gym/ld-export-447c1d51-09032023.JPG',
        'assests/gym/ld-export-51c2cf4f-09032023.JPG',
        'assests/gym/ld-export-7f6c5cbe-09032023.JPG',
        'assests/gym/ld-export-8af2476d-09042023.JPG',
        'assests/gym/ld-export-91592456-09042023.JPG',
        'assests/gym/ld-export-a1cff887-09032023.JPG',
        'assests/gym/ld-export-d0e3386e-09032023.JPG',
        'assests/gym/ld-export-d34b3c25-09032023.JPG',
        'assests/gym/ld-export-ef3c4383-09032023.JPG',
    ],
};
let lbPhotos = [];
let lbIndex  = 0;

function openLightbox(name, subtitle) {
    lbPhotos = categoryPhotos[name] || [];
    lbIndex  = 0;

    document.getElementById('lightboxTitle').textContent    = name;
    document.getElementById('lightboxSubtitle').textContent = subtitle;

    const grid = document.getElementById('lightboxGrid');
    grid.innerHTML = '';
    lbPhotos.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'lightbox-item';
        item.innerHTML = `<img src="${src}" alt="${name} photo ${i+1} by Peter Lukani"
            loading="lazy" onerror="this.closest('.lightbox-item').style.display='none'">`;
        item.addEventListener('click', () => openViewer(i));
        grid.appendChild(item);
    });

    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openViewer(index) {
    lbIndex = index;
    document.getElementById('lb-viewer')?.remove();

    const viewer = document.createElement('div');
    viewer.id = 'lb-viewer';
    viewer.style.cssText = `
        position:fixed;inset:0;z-index:9500;
        background:rgba(14,14,12,.98);
        display:flex;align-items:center;justify-content:center;
        animation:fadeIn .2s ease;
    `;
    viewer.innerHTML = `
        <button onclick="closeViewer()" style="position:absolute;top:24px;right:32px;
            background:none;border:none;cursor:pointer;font-family:'DM Mono',monospace;
            font-size:11px;letter-spacing:.3em;color:#8a8478;transition:color .2s"
            onmouseover="this.style.color='#f5f0e8'" onmouseout="this.style.color='#8a8478'">
            ✕ &nbsp; CLOSE
        </button>
        <div id="lb-counter" style="position:absolute;top:28px;left:50%;transform:translateX(-50%);
            font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.3em;color:#c9a84c;">
            ${lbIndex+1} / ${lbPhotos.length}
        </div>
        <button onclick="stepViewer(-1)" style="position:absolute;left:24px;top:50%;
            transform:translateY(-50%);background:none;border:1px solid rgba(201,168,76,.3);
            width:52px;height:52px;cursor:pointer;color:#c9a84c;font-size:24px;
            transition:background .2s,border-color .2s"
            onmouseover="this.style.background='rgba(201,168,76,.12)';this.style.borderColor='#c9a84c'"
            onmouseout="this.style.background='none';this.style.borderColor='rgba(201,168,76,.3)'">‹</button>
        <img id="lb-img" src="${lbPhotos[lbIndex]}" alt="Photo ${lbIndex+1}"
            style="max-width:88vw;max-height:86vh;object-fit:contain;
                   box-shadow:0 24px 80px rgba(0,0,0,.7);transition:opacity .18s">
        <button onclick="stepViewer(1)" style="position:absolute;right:24px;top:50%;
            transform:translateY(-50%);background:none;border:1px solid rgba(201,168,76,.3);
            width:52px;height:52px;cursor:pointer;color:#c9a84c;font-size:24px;
            transition:background .2s,border-color .2s"
            onmouseover="this.style.background='rgba(201,168,76,.12)';this.style.borderColor='#c9a84c'"
            onmouseout="this.style.background='none';this.style.borderColor='rgba(201,168,76,.3)'">›</button>
    `;
    viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
    document.body.appendChild(viewer);
}

function stepViewer(dir) {
    lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
    const img     = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(() => {
        img.src         = lbPhotos[lbIndex];
        img.alt         = `Photo ${lbIndex+1}`;
        counter.textContent = `${lbIndex+1} / ${lbPhotos.length}`;
        img.style.opacity = '1';
    }, 160);
}

function closeViewer() { document.getElementById('lb-viewer')?.remove(); }

function closeLightbox() {
    closeViewer();
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', e => {
    if (document.getElementById('lb-viewer')) {
        if (e.key === 'ArrowRight') stepViewer(1);
        if (e.key === 'ArrowLeft')  stepViewer(-1);
        if (e.key === 'Escape')     closeViewer();
    } else if (document.getElementById('lightbox').classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
    }
});

// ── BOOKING FORM ───────────────────────────────
// SETUP: go to web3forms.com, enter your email, get a free key, paste it below.
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';

async function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const pkg   = document.getElementById('pkg').value;
    const msg   = document.getElementById('msg').value.trim();
    const btn   = document.querySelector('.form-submit');

    if (!fname || !email) { showFormError('Please fill in your name and email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFormError('Please enter a valid email address.'); return; }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
        const res  = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject:    `📸 New Booking Enquiry — ${fname} ${lname}`,
                from_name:  'Peter Lukani Photography Website',
                name:       `${fname} ${lname}`,
                email, package: pkg || 'Not selected',
                message:    msg || 'No message provided',
                redirect:   'false'
            })
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('bookingForm').style.display = 'none';
            document.getElementById('formSuccess').classList.add('show');
        } else { throw new Error(data.message); }
    } catch (err) {
        btn.textContent = 'Send Enquiry →';
        btn.disabled = false;
        showFormError('Something went wrong. Please email peterlukaniphotography@gmail.com directly.');
    }
}

function showFormError(msg) {
    let el = document.getElementById('formError');
    if (!el) {
        el = document.createElement('p');
        el.id = 'formError';
        el.style.cssText = 'color:#e07a5f;font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.15em;margin-top:12px;text-align:center;';
        document.querySelector('.form-submit').insertAdjacentElement('afterend', el);
    }
    el.textContent = msg;
}