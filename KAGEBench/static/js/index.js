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
  // Enhanced busuanzi initialization with fallback
  const pageViewElement = document.getElementById('busuanzi_value_page_pv');
  const containerElement = document.getElementById('busuanzi_container_page_pv');
  
  if (!pageViewElement) {
    console.error('Busuanzi page view element not found');
    return;
  }
  
  // Initially show loading state
  pageViewElement.textContent = 'Loading...';
  if (containerElement) {
    containerElement.style.display = '';
  }
  
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds timeout
  
  console.log('Initializing busuanzi counter for path:', window.busuanzi_page_path || window.location.pathname);
  
  const checkBusuanzi = setInterval(() => {
    attempts++;
    
    // Check if busuanzi has updated the value (it removes the "Loading" text)
    const currentText = pageViewElement.textContent;
    if (currentText && currentText !== 'Loading...' && currentText !== '--' && currentText.match(/^\d+$/)) {
      clearInterval(checkBusuanzi);
      console.log('Busuanzi loaded successfully. Page views:', currentText);
      return;
    }
    
    // If busuanzi hasn't loaded after max attempts, try manual fetch
    if (attempts >= maxAttempts) {
      clearInterval(checkBusuanzi);
      console.warn('Busuanzi took too long to load, attempting manual fetch');
      
      // Try manual JSONP fetch as fallback
      const callbackName = 'BusuanziCallback_' + Date.now();
      window[callbackName] = function(data) {
        console.log('Manual busuanzi fetch response:', data);
        if (data && data.page_pv) {
          pageViewElement.textContent = data.page_pv;
          console.log('Manual fetch successful. Page views:', data.page_pv);
        } else {
          pageViewElement.textContent = '--';
          console.warn('Manual fetch returned no data');
        }
        delete window[callbackName];
      };
      
      const script = document.createElement('script');
      script.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}`;
      script.onerror = function() {
        console.error('Failed to load busuanzi script');
        pageViewElement.textContent = '--';
        delete window[callbackName];
      };
      document.head.appendChild(script);
      
      // Timeout for manual fetch
      setTimeout(() => {
        if (pageViewElement.textContent === 'Loading...') {
          console.error('Busuanzi failed to load after all attempts');
          pageViewElement.textContent = '--';
        }
        if (window[callbackName]) {
          delete window[callbackName];
        }
      }, 5000);
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollToTop();
  initMoreWorksDismiss();
  initCarousels();
  initBusuanziCounter();
});
