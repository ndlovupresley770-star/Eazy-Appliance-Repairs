/* ==========================================================================
   pages.js - Behaviour for the added pages (forms, blog filter, article TOC)
   Loaded after script.js. Does not change any existing behaviour.
   ========================================================================== */

/* 1. Booking / callback / contact form validation (same markup as other pages) */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form.booking-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allValid = true;

      form.querySelectorAll(".form-group").forEach((group) => {
        const field = group.querySelector(".form-control");
        const error = group.querySelector(".error-msg");
        if (!field || !field.hasAttribute("required")) return;

        const value = field.value.trim();
        let valid = value !== "";

        if (valid && field.type === "tel") {
          const digits = value.replace(/[^\d]/g, "");
          valid = digits.length >= 9 && digits.length <= 12;
        }
        if (valid && field.type === "email") {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        field.classList.toggle("invalid", !valid);
        if (error) error.style.display = valid ? "none" : "block";
        if (!valid) allValid = false;
      });

      const success = form.querySelector(".form-success-alert");
      if (success) success.style.display = allValid ? "block" : "none";
      if (allValid) form.reset();
    });

    // Clear error state as the visitor corrects a field
    form.querySelectorAll(".form-control").forEach((field) => {
      const clear = () => {
        field.classList.remove("invalid");
        const err = field.closest(".form-group")?.querySelector(".error-msg");
        if (err) err.style.display = "none";
      };
      field.addEventListener("input", clear);
      field.addEventListener("change", clear);
    });
  });
});

/* 2. Blog category filter */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".blog-filter .filter-btn");
  const posts = document.querySelectorAll("[data-post-cat]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      posts.forEach((p) => {
        const show = cat === "all" || p.getAttribute("data-post-cat") === cat;
        p.style.display = show ? "" : "none";
      });
    });
  });
});

/* 3. Article table-of-contents: highlight the section being read */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".toc-list a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const map = new Map();
  links.forEach((a) => {
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (target) map.set(target, a);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(entry.target)?.classList.add("active");
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );
  map.forEach((_, target) => observer.observe(target));
});
