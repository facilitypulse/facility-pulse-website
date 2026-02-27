const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
  document.body.classList.toggle('nav-open');
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('active');
    document.body.classList.remove('nav-open');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Header shadow on scroll + scroll-to-top visibility
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 10;
  header?.classList.toggle('scrolled', scrolled);
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
});

// Scroll to top
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in animations on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Contact form — opens user's email client with pre-filled message
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const facility = document.getElementById('facility').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Consultation Request from ${name}`);
  const bodyParts = [
    `Name: ${name}`,
    `Email: ${email}`,
    facility ? `Facility: ${facility}` : '',
    '',
    message ? `Message:\n${message}` : ''
  ].filter(Boolean).join('\n');
  const body = encodeURIComponent(bodyParts);

  const mailtoLink = document.createElement('a');
  mailtoLink.href = `mailto:facilitypulse@gmail.com?subject=${subject}&body=${body}`;
  mailtoLink.click();

  submitBtn.textContent = 'Message sent!';
  submitBtn.classList.add('sent');
  contactForm.reset();

  setTimeout(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.classList.remove('sent');
  }, 4000);
});
