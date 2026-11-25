
/* ==========================================
   JENNA CREATES — MOBILE CONTACT JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const burger = document.getElementById("mcBurger");
  const overlay = document.getElementById("mcMenu");

  if (!burger || !overlay) return;

  function toggleMenu(open) {

    burger.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);

    burger.setAttribute(
      "aria-expanded",
      String(open)
    );

    burger.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    overlay.setAttribute(
      "aria-hidden",
      String(!open)
    );

    document.body.style.overflow =
      open ? "hidden" : "";
  }

  burger.addEventListener("click", () => {

    const isOpen =
      burger.classList.contains("is-open");

    toggleMenu(!isOpen);

  });

  overlay.addEventListener("click", event => {

    if (event.target === overlay) {
      toggleMenu(false);
    }

  });

  overlay.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
      toggleMenu(false);
    });

  });

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      toggleMenu(false);
    }

  });

});
