function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setMoreWorksOpen(isOpen) {
  const container = document.querySelector(".more-works-container");
  const dropdown = document.getElementById("moreWorksDropdown");
  const button = document.querySelector(".more-works-btn");

  if (!container || !dropdown || !button) return;

  container.classList.toggle("is-open", isOpen);
  dropdown.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
}

function toggleMoreWorks() {
  const dropdown = document.getElementById("moreWorksDropdown");
  if (!dropdown) return;
  setMoreWorksOpen(!dropdown.classList.contains("is-open"));
}

async function copyBibTeX() {
  const code = document.querySelector("#bibtex-code code");
  const button = document.querySelector(".copy-bibtex-btn");
  const textSpan = document.querySelector(".copy-bibtex-btn .copy-text");
  if (!code) return;

  const text = code.textContent || "";

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  if (button) button.classList.add("is-copied");
  if (textSpan) textSpan.textContent = "Copied";
  window.setTimeout(() => {
    if (button) button.classList.remove("is-copied");
    if (textSpan) textSpan.textContent = "Copy";
  }, 1200);
}

function initScrollToTop() {
  const button = document.querySelector(".scroll-to-top");
  if (!button) return;

  const onScroll = () => {
    const shouldShow = window.scrollY > 400;
    button.classList.toggle("is-visible", shouldShow);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMoreWorksDismiss() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMoreWorksOpen(false);
  });

  document.addEventListener("click", (event) => {
    const container = document.querySelector(".more-works-container");
    const dropdown = document.getElementById("moreWorksDropdown");
    if (!container || !dropdown) return;
    if (!dropdown.classList.contains("is-open")) return;
    if (container.contains(event.target)) return;
    setMoreWorksOpen(false);
  });
}

function initCarousels() {
  if (!window.bulmaCarousel) return;
  window.bulmaCarousel.attach(".carousel", {
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
  });
}

function initVisitorCounter() {
  const counter = document.getElementById("kagebench_visitor_count");
  if (!counter) return;

  const namespace = "avanturist322-github-io";
  const key = "kagebench";
  const countUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;

  fetch(countUrl, { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => {
      const numericValue = Number(data?.value);
      if (!Number.isNaN(numericValue)) {
        counter.textContent = numericValue.toLocaleString();
      } else {
        counter.textContent = "N/A";
      }
    })
    .catch((error) => {
      console.error("Visitor counter failed:", error);
      counter.textContent = "N/A";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollToTop();
  initMoreWorksDismiss();
  initCarousels();
  initVisitorCounter();
});
