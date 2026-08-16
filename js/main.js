document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(Boolean(open)));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav a");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY + 90;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.id;
        if (y >= top && y < top + height) {
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { passive: true }
  );

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      note.textContent = "Merci de remplir tous les champs.";
      return;
    }

    const subject = encodeURIComponent(`Contact portfolio — ${name}`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:tom.logez@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Votre client mail va s’ouvrir.";
    form.reset();
  });

  document.querySelectorAll("[data-photo]").forEach((box) => {
    const img = box.querySelector("img");
    if (!img) return;
    const show = () => box.classList.add("has-photo");
    if (img.complete && img.naturalWidth > 0) show();
    img.addEventListener("load", show);
    img.addEventListener("error", () => box.classList.remove("has-photo"));
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach((el) => el.classList.toggle("is-on", el === button));
      document.querySelectorAll(".case").forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.getAttribute("data-cat") !== filter);
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const closeLightbox = () => lightbox?.setAttribute("hidden", "");

  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-lightbox");
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightbox.removeAttribute("hidden");
    });
  });

  lightbox?.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
});
