
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("pmBurger");
  const overlay = document.getElementById("pmMenu");
  const menuCard = overlay?.querySelector(".pm-menu-card");
  const folder = document.getElementById("pmFolderCard");

  let previousFocus = null;

  function openMenu() {
    previousFocus = document.activeElement;

    burger.classList.add("is-open");
    overlay.classList.add("is-open");

    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close navigation menu");
    overlay.setAttribute("aria-hidden", "false");

    document.body.classList.add("pm-menu-open");

    overlay.querySelector("a")?.focus();
  }

  function closeMenu() {
    burger.classList.remove("is-open");
    overlay.classList.remove("is-open");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("pm-menu-open");

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
  }

  // TAP THE FOLDER TO OPEN IT
  if (folder) {
    folder.addEventListener("click", () => {
      folder.classList.toggle("is-tapped");
    });
  }
});
