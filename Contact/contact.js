
/* ==========================================
   JENNA CREATES — CONTACT PAGE JAVASCRIPT
========================================== */

/* CONTACT INFORMATION */

const CONTACT = {
  email: "jennatonido@gmail.com",
  linkedin: "https://www.linkedin.com/in/elaine-jenna-tonido-135750348/",
  whatsapp: "639626395817"
};


/* ==========================================
   BURGER MENU
========================================== */

const burger = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

function setMenu(open) {
  burger.classList.toggle('is-open', open);
  menu.classList.toggle('is-open', open);

  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute(
    'aria-label',
    open ? 'Close menu' : 'Open menu'
  );
}

burger.addEventListener('click', () => {
  setMenu(!menu.classList.contains('is-open'));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    setMenu(false);
  }
});

menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setMenu(false));
});

document.addEventListener('click', e => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    setMenu(false);
  }
});


/* ==========================================
   EMAIL & SOCIAL LINKS
========================================== */

const emailLink = document.getElementById('email-link');
const linkedInLink = document.getElementById('linkedin-link');
const whatsAppLink = document.getElementById('whatsapp-link');

const configuredEmail = CONTACT.email.trim();

emailLink.textContent = configuredEmail || 'Email coming soon';

emailLink.href = configuredEmail
  ? `mailto:${configuredEmail}`
  : '#';

if (!configuredEmail) {
  emailLink.addEventListener('click', e => e.preventDefault());
}

function configureSocial(element, url) {
  if (url) {
    element.href = url;
  } else {
    element.removeAttribute('href');
    element.setAttribute('aria-disabled', 'true');
    element.title += ' — link coming soon';
  }
}

configureSocial(
  linkedInLink,
  CONTACT.linkedin.trim()
);

configureSocial(
  whatsAppLink,
  CONTACT.whatsapp.trim()
    ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`
    : ''
);


/* ==========================================
   CONTACT FORM
========================================== */

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();

  const feedback = document.getElementById('form-feedback');

  if (!configuredEmail) {
    feedback.textContent =
      'Contact email is not configured yet. Please add it to contact.js before publishing.';
    return;
  }

  const name = document.getElementById('full-name').value.trim();
  const from = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (
    !name ||
    !from ||
    !message ||
    !e.currentTarget.reportValidity()
  ) {
    return;
  }

  const subject = encodeURIComponent(
    `Portfolio inquiry from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${from}\n\nMessage:\n${message}`
  );

  feedback.textContent =
    'Opening your email app. Please press Send there to complete your message.';

  window.location.href =
    `mailto:${configuredEmail}?subject=${subject}&body=${body}`;
});
