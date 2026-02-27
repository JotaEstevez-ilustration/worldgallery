/**
 * ============================================
 * WEB ATELIER (UDIT) - Student Project Template
 * ============================================
 * Main JavaScript: Scrollytelling Functionality
 * ============================================
 * PEDAGOGICAL NOTE: This file implements
 * scrollytelling with Intersection Observer API.
 * Progressive enhancement: site works without JS.
 * ============================================
 */

// ===== INTERSECTION OBSERVER FOR SCROLL-TRIGGERED ANIMATIONS =====
// PEDAGOGICAL NOTE: Modern, performant way to detect when elements
// enter viewport. Better than scroll event listeners.

const observerOptions = {
	threshold: 0.2, // Trigger when 20% of element is visible
	rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Element is visible, add 'visible' class to trigger CSS animations
			entry.target.classList.add('visible');

			// PEDAGOGICAL NOTE: Optional - stop observing after animation
			// Uncomment below if you want one-time animations only
			// observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe all sections with data-observe attribute
// PEDAGOGICAL NOTE: data-* attributes are semantic way to mark elements for JS
document.querySelectorAll('[data-observe]').forEach((section) => {
	observer.observe(section);
});

// ===== SCROLL PROGRESS INDICATOR =====
// PEDAGOGICAL NOTE: Shows user how far they've scrolled through the page

function updateScrollProgress() {
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight;
	const scrollTop = window.scrollY;

	// Calculate percentage scrolled
	const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

	// Update progress display
	const progressElement = document.getElementById('progress');
	if (progressElement) {
		progressElement.textContent = Math.round(scrollPercent);
	}
}

// Listen for scroll events (throttled by browser's requestAnimationFrame)
window.addEventListener('scroll', updateScrollProgress);

// Initialize on page load
updateScrollProgress();

// ===== SCROLL TO TOP FUNCTION =====
// PEDAGOGICAL NOTE: Smooth scroll to top for better UX

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

// Make function available globally for onclick in HTML
// PEDAGOGICAL NOTE: In production, prefer addEventListener over onclick
window.scrollToTop = scrollToTop;

// ===== SMOOTH SCROLL BEHAVIOR =====
// PEDAGOGICAL NOTE: CSS scroll-behavior is simpler, but this works in all browsers

document.documentElement.style.scrollBehavior = 'smooth';

// ===== REDUCED MOTION PREFERENCE =====
// PEDAGOGICAL NOTE: Respect user's accessibility preferences
// If user prefers reduced motion, disable scroll animations

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	// Disable smooth scrolling
	document.documentElement.style.scrollBehavior = 'auto';

	// Optionally: add a class to body to disable CSS animations
	document.body.classList.add('reduce-motion');

	console.log('Reduced motion preference detected - animations disabled');
}

// ===== CONSOLE LOG FOR DEBUGGING =====
// PEDAGOGICAL NOTE: Helpful during development, remove in production

console.log('✅ Scrollytelling initialized');
console.log(`📊 Observing ${document.querySelectorAll('[data-observe]').length} sections`);

// ===== GALLERY LIGHTBOX =====
(function(){
	const gallerySelector = '.gallery .grid';
	const grid = document.querySelector(gallerySelector);
	if(!grid) return;

	// Create lightbox elements
	const lightbox = document.createElement('div');
	lightbox.className = 'lightbox';
	lightbox.setAttribute('aria-hidden', 'true');
	lightbox.innerHTML = `
		<button class="lightbox__close" aria-label="Cerrar (Esc)">✕</button>
		<img class="lightbox__img" src="" alt="">
	`;
	document.body.appendChild(lightbox);

	const lbImg = lightbox.querySelector('.lightbox__img');
	const lbClose = lightbox.querySelector('.lightbox__close');

	function openLightbox(src, alt){
		lbImg.src = src;
		lbImg.alt = alt || '';
		lightbox.classList.add('open');
		lightbox.setAttribute('aria-hidden', 'false');
		// trap focus on close button
		lbClose.focus();
	}

	function closeLightbox(){
		lightbox.classList.remove('open');
		lightbox.setAttribute('aria-hidden', 'true');
		lbImg.src = '';
	}

	// Click on images
	grid.addEventListener('click', (e)=>{
		const img = e.target.closest('img');
		if(!img) return;
		openLightbox(img.src, img.alt);
	});

	// Close handlers
	lbClose.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (e)=>{
		if(e.target === lightbox) closeLightbox();
	});

	// Keyboard support
	document.addEventListener('keydown', (e)=>{
		if(e.key === 'Escape') closeLightbox();
		if((e.key === 'ArrowRight' || e.key === 'Right') && lightbox.classList.contains('open')){
			// next image
			const imgs = Array.from(grid.querySelectorAll('img'));
			const idx = imgs.findIndex(i=>i.src === lbImg.src);
			if(idx > -1 && idx < imgs.length - 1) openLightbox(imgs[idx+1].src, imgs[idx+1].alt);
		}
		if((e.key === 'ArrowLeft' || e.key === 'Left') && lightbox.classList.contains('open')){
			const imgs = Array.from(grid.querySelectorAll('img'));
			const idx = imgs.findIndex(i=>i.src === lbImg.src);
			if(idx > 0) openLightbox(imgs[idx-1].src, imgs[idx-1].alt);
		}
	});

	// Accessibility: add role
	lightbox.setAttribute('role','dialog');
	lightbox.setAttribute('aria-modal','true');
})();
