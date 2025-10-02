$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });

  // Email protection function
  window.constructEmail = function(element) {
    const email = element.getAttribute('data-email');
    const domain = element.getAttribute('data-domain');
    const fullEmail = email + '@' + domain;
    window.location.href = 'mailto:' + fullEmail;
  };

  // Email reveal-on-click functionality (Base64 encoded for security)
  window.revealEmail = function(element) {
    // Base64 encoded email: "cherepanovegor2018@gmail.com"
    const encodedEmail = "Y2hlcmVwYW5vdmVnb3IyMDE4QGdtYWlsLmNvbQ==";
    const fullEmail = atob(encodedEmail);

    // Replace the text content with the actual email
    element.textContent = fullEmail;

    // Add revealed class for styling
    element.classList.add('revealed');

    // Make it clickable for copying email
    element.onclick = function() {
      copyToClipboard(fullEmail);
    };

    // Update title
    element.title = 'Click to copy email address';
  };

  // Copy text to clipboard
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern Clipboard API
      navigator.clipboard.writeText(text).then(function() {
        showCopyFeedback();
      }).catch(function(err) {
        console.error('Failed to copy: ', err);
        fallbackCopyTextToClipboard(text);
      });
    } else {
      // Fallback for older browsers or non-HTTPS
      fallbackCopyTextToClipboard(text);
    }
  }

  // Fallback copy method for older browsers
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopyFeedback();
      } else {
        console.error('Fallback: Unable to copy');
      }
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  // Show visual feedback when email is copied
  function showCopyFeedback() {
    // Remove any existing feedback first
    const existingFeedback = document.querySelector('.copy-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = '📧 Email copied!';
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: copyFeedback 2.5s ease-in-out forwards;
      pointer-events: none;
      max-width: 300px;
      text-align: center;
    `;

    document.body.appendChild(feedback);

    // Remove after animation
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 2500);
  }
});
