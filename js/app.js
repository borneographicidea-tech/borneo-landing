document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".navbar__toggle");
  const mobileMenu = document.querySelector(".navbar__mobile");
  const mobileLinks = document.querySelectorAll(".navbar__mobile a");

  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  updateNavbar();
});