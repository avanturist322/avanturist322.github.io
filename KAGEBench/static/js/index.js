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

function initBusuanziCounter() {
  // Implement custom busuanzi counter to ensure unique page tracking
  // The standard busuanzi might confuse pages, so we fetch directly
  
  const callbackName = 'BusuanziCallback_' + Math.random().toString(36).substring(2, 15);
  const pageUrl = window.location.origin + window.location.pathname;
  
  // Create global callback function
  window[callbackName] = function(data) {
    const pageViewElement = document.getElementById('busuanzi_value_page_pv');
    if (pageViewElement && data && data.page_pv) {
      pageViewElement.textContent = data.page_pv;
    }
    // Cleanup
    delete window[callbackName];
    const script = document.querySelector(`script[src*="${callbackName}"]`);
    if (script) script.remove();
  };
  
  // Make JSONP request with explicit page URL
  const script = document.createElement('script');
  script.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}`;
  script.onerror = function() {
    console.warn('Failed to load busuanzi counter');
    delete window[callbackName];
  };
  
  // Remove the default busuanzi script to avoid conflicts
  const existingScript = document.querySelector('script[src*="busuanzi.pure.mini.js"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollToTop();
  initMoreWorksDismiss();
  initCarousels();
  initBusuanziCounter();
});
