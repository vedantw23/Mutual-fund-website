document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  setActiveNavigation();
  setupNavbarDepth();
  setupRevealAnimations();
  setupTiltEffect();
  setupDistributorPhoto();
  setupRobotWidget();
  setupWhatsAppForm();
});

function setActiveNavigation() {
=======
>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === currentPage;
<<<<<<< HEAD

=======
>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
<<<<<<< HEAD
}

/* Major interaction change: navbar gains depth after scrolling */
function setupNavbarDepth() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) {
    return;
  }

  const updateNavbar = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

/* Major interaction change: sections reveal smoothly while entering view */
function setupRevealAnimations() {
  const revealTargets = Array.from(
    document.querySelectorAll(
      ".hero, .section-block, .container, .benefit-card, .hero-highlight, .growth-visual, .page-intro-card, .calculator-card, .about-hero-card, .about-card, .about-closing, .contact-info-card, .contact-form-card"
    )
  );

  if (!revealTargets.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    revealTargets.forEach((element) => element.classList.add("in-view"));
    return;
  }

  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

/* Major interaction change: subtle 3D tilt for key cards on desktop */
function setupTiltEffect() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (reducedMotion || touchDevice) {
    return;
  }

  const tiltTargets = document.querySelectorAll(
    ".hero-highlight, .benefit-card, .growth-visual, .page-intro-card, .calculator-card, .about-card, .about-hero-card, .contact-info-card, .contact-form-card, .bamboo-photo-frame"
  );

  tiltTargets.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = (event.clientX - centerX) / 28;
      const rotateX = (centerY - event.clientY) / 28;

      card.style.transform = `perspective(1200px) rotateX(${clamp(rotateX, -5, 5)}deg) rotateY(${clamp(rotateY, -5, 5)}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
=======

  const revealTargets = Array.from(
    document.querySelectorAll(
      ".hero, .section-block, .container, .benefit-card, .timeline-list li, .hero-highlight, .growth-visual, .page-intro-card, .calculator-card, .about-hero-card, .about-card, .contact-info-card, .contact-form-card"
    )
  );

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && revealTargets.length) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  setupDistributorPhoto();
  setupRobotWidget();
  setupWhatsAppForm();
});
>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b

function setupDistributorPhoto() {
  const photo = document.querySelector(".distributor-photo");
  if (!photo) {
    return;
  }

  const sources = [
    "distributor.jpg",
    "distributor.jpeg",
    "distributor.png",
    "distributor.webp",
    "distributor-placeholder.svg"
  ];

  let index = 0;

  photo.addEventListener("error", () => {
    index += 1;
    if (index < sources.length) {
      photo.src = sources[index];
    }
  });

  photo.src = sources[index];
}

function setupRobotWidget() {
  if (document.querySelector(".whatsapp-robot")) {
    return;
  }

  const robotLink = document.createElement("a");
  const whatsappNumber = "919423581210";
  const quickMessage = encodeURIComponent("Hello, I would like to know more about mutual fund investment.");

  robotLink.href = `https://wa.me/${whatsappNumber}?text=${quickMessage}`;
  robotLink.className = "whatsapp-robot";
  robotLink.target = "_blank";
  robotLink.rel = "noopener noreferrer";
  robotLink.title = "Chat on WhatsApp";
  robotLink.setAttribute("aria-label", "Chat on WhatsApp");
  robotLink.setAttribute("data-label", "Connect on WhatsApp");
  robotLink.innerHTML = '<span class="robot-icon">&#129302;</span>';

  document.body.appendChild(robotLink);
}

function setupWhatsAppForm() {
  const form = document.getElementById("whatsapp-contact-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();

    const text = [
      "Hello Anil Waghunde,",
      "",
      "I would like to connect regarding mutual fund investment.",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message}`
    ].join("\n");

    const whatsappNumber = "919423581210";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.location.href = whatsappUrl;
  });
<<<<<<< HEAD
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
=======
}



>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b
