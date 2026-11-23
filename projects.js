
// ==========================================
// PROJECTS — COMING SOON
// Interactive animations and navigation
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // BURGER MENU
  // ========================================

  const burger = document.getElementById("projectBurger");
  const overlay = document.getElementById("projectMenu");
  const menuCard = overlay?.querySelector(".project-menu-card");

  let previousFocus = null;

  function openMenu() {
    if (!burger || !overlay) return;

    previousFocus = document.activeElement;

    burger.classList.add("is-open");
    overlay.classList.add("is-open");

    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close navigation menu");

    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    overlay.querySelector("a")?.focus();
  }

  function closeMenu() {
    if (!burger || !overlay) return;

    burger.classList.remove("is-open");
    overlay.classList.remove("is-open");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");

    (previousFocus || burger).focus();
    overlay.setAttribute("aria-hidden", "true");
  }

  if (burger && overlay && menuCard) {

    burger.addEventListener("click", () => {
      if (overlay.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", event => {
      if (!menuCard.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (!overlay.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeMenu();
      }

      if (event.key === "Tab") {
        const focusables = [
          burger,
          ...overlay.querySelectorAll("a[href]")
        ];

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    overlay.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (!link.getAttribute("href")?.startsWith("#")) {
          document.body.classList.remove("menu-open");
        }
      });
    });
  }

  // ========================================
  // FOLDER CARD — 3D MOUSE TILT
  // ========================================

  const card = document.getElementById("folderCard");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (card && !reducedMotion.matches && finePointer.matches) {

    let frame = null;

    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - .5) * 9;
      const rotateX = (.5 - y) * 7;

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        card.style.setProperty("--rx", `${rotateX}deg`);
        card.style.setProperty("--ry", `${rotateY}deg`);
        frame = null;
      });
    });

    card.addEventListener("pointerleave", () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }

      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  }

});
