const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const utilitySearch = document.getElementById('utilitySearch');
const noResults = document.getElementById('noResults');

function closeSidebar() {
  navLinks?.classList.remove('open');
  navToggle?.classList.remove('active');
  document.body.classList.remove('nav-open');
  navOverlay?.classList.remove('visible');
}

navToggle?.addEventListener('click', () => {
  const opening = !navLinks.classList.contains('open');
  if (opening) {
    navLinks.classList.add('open');
    navToggle.classList.add('active');
    document.body.classList.add('nav-open');
    navOverlay?.classList.add('visible');
  } else {
    closeSidebar();
  }
});

navOverlay?.addEventListener('click', closeSidebar);

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeSidebar);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 10);
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

utilitySearch?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const categories = document.querySelectorAll('.utility-category');
  let totalVisible = 0;

  categories.forEach(category => {
    const items = category.querySelectorAll('.utility-item');
    let categoryVisible = 0;

    items.forEach(item => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.style.display = matches ? '' : 'none';
      if (matches) categoryVisible++;
    });

    category.style.display = categoryVisible > 0 ? '' : 'none';
    totalVisible += categoryVisible;
  });

  if (noResults) noResults.style.display = totalVisible === 0 ? 'block' : 'none';
});

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

  const mailtoLink = document.createElement('a');
  mailtoLink.href = `mailto:facilitypulse@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyParts)}`;
  mailtoLink.click();

  submitBtn.textContent = 'Message sent!';
  submitBtn.classList.add('sent');
  contactForm.reset();

  setTimeout(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.classList.remove('sent');
  }, 4000);
});

const utilityBillInput = document.getElementById('utilityBill');

function formatCurrency(value) {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateCalculator() {
  const utilityBill = parseFloat(utilityBillInput?.value) || 0;

  const monthlyCost = utilityBill * 0.035;
  const yearlyCost = monthlyCost * 12;
  const annualUsage = utilityBill * 12 / 0.15;
  const EPP = 0.15 * (annualUsage * 0.9 * 0.08 + annualUsage * 0.1 * 0.3);
  const billSavings = utilityBill * 12 * 0.15;
  const net = billSavings + EPP - yearlyCost;

  document.getElementById('calcMonthlyCost').textContent = formatCurrency(monthlyCost);
  document.getElementById('calcYearlyCost').textContent = formatCurrency(yearlyCost);
  document.getElementById('calcEPP').textContent = formatCurrency(EPP);
  document.getElementById('calcBillSavings').textContent = formatCurrency(billSavings);

  const netEl = document.getElementById('calcNet');
  netEl.textContent = formatCurrency(net);
  netEl.style.color = net >= 0 ? '' : '#DC2626';
}

utilityBillInput?.addEventListener('input', updateCalculator);

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    if (isOpen) {
      answer.style.maxHeight = null;
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
