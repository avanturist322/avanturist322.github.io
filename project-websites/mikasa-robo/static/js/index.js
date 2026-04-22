window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

function setupBenchmarkVideoAutoplay() {
    const taskVideos = document.querySelectorAll('.benchmark-video-player');

    if (taskVideos.length === 0) return;

    const playVideo = (video) => {
        video.play().catch(() => {});
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                playVideo(video);
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '120px 0px'
    });

    taskVideos.forEach(video => {
        video.muted = true;
        video.loop = true;
        observer.observe(video);
        playVideo(video);
    });
}

function getTaskInstruction(taskName) {
    const name = taskName || '';

    if (name.includes('BatteriesCheckerEasy')) return 'Count the required battery pattern and complete the checker interaction in an easy setup.';
    if (name.includes('BatteriesCheckerHard')) return 'Identify the correct battery pattern among distractors and complete the checker interaction.';
    if (name.includes('BlinkCountButtonPressEasy')) return 'Observe the lamp blink pattern and press the button the exact number of times (easy).';
    if (name.includes('BlinkCountButtonPressMedium')) return 'Observe the lamp blink pattern and press the button the exact number of times (medium).';
    if (name.includes('BlinkCountButtonPressHard')) return 'Observe the lamp blink pattern and press the button the exact number of times (hard).';
    if (name.includes('BunchOfColors')) return 'Find and act on the group of objects matching the requested target color set.';
    if (name.includes('ChainOfColors')) return 'Follow the color chain in order and select the correct next item at each step.';
    if (name.includes('FindImposterShapeAndColor')) return 'Locate the single item that violates both shape and color patterns.';
    if (name.includes('FindImposterColor')) return 'Locate the item with the wrong color relative to the rest and select it.';
    if (name.includes('FindImposterShape')) return 'Locate the item with the wrong shape relative to the rest and select it.';
    if (name.includes('InterceptGrabFast')) return 'Intercept the fast moving target and grasp it before it leaves the workspace.';
    if (name.includes('InterceptGrabMedium')) return 'Intercept the medium-speed moving target and grasp it before it leaves the workspace.';
    if (name.includes('InterceptGrabSlow')) return 'Intercept the slow moving target and grasp it before it leaves the workspace.';
    if (name.includes('InterceptFast')) return 'Track the fast moving target and intercept it at the correct moment.';
    if (name.includes('InterceptMedium')) return 'Track the moving target and intercept it at the correct moment.';
    if (name.includes('InterceptSlow')) return 'Track the slow moving target and intercept it at the correct moment.';
    if (name.includes('RememberShapeAndColor')) return 'Memorize shape-color combinations, then reproduce the correct answer after delay.';
    if (name.includes('RememberColor')) return 'Memorize the shown colors, then reproduce the correct answer after delay.';
    if (name.includes('RememberShape')) return 'Memorize the shown shapes, then reproduce the correct answer after delay.';
    if (name.includes('SeqOfColors')) return 'Repeat the full color sequence in the exact correct order.';
    if (name.includes('ShellGameColorLampTouch')) return 'Track the correct cup using color/lamp cues through shuffles, then touch it.';
    if (name.includes('ShellGamePick')) return 'Track the hidden item through shuffles and pick from the correct final cup.';
    if (name.includes('ShellGamePush')) return 'Track the hidden item through shuffles and push the correct final cup.';
    if (name.includes('ShellGameShuffleColorLampTouch')) return 'Track the cup under shuffle using color/lamp cues, then touch the final target.';
    if (name.includes('ShellGameShuffleTouch')) return 'Track the cup under shuffle and touch the correct final position.';
    if (name.includes('ShellGameTouch')) return 'Track the hidden item through shuffles and touch the correct final cup.';
    if (name.includes('TakeItBack')) return 'Pick the moved object and return it to its original location.';

    return 'Solve the task objective and stop when the episode is complete.';
}

function normalizeBenchmarkCards() {
    const cards = document.querySelectorAll('.benchmark-video-card');
    const grid = document.querySelector('.benchmark-videos-grid');

    if (grid) {
        const applyGridColumns = () => {
            if (window.innerWidth <= 700) {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            }
        };
        grid.style.display = 'grid';
        grid.style.gap = '1.4rem';
        applyGridColumns();
        window.addEventListener('resize', applyGridColumns);
    }

    if (cards.length === 0) return;

    cards.forEach((card, index) => {
        card.style.background = '#f8fafc';
        card.style.border = '1px solid #dbe3ed';
        card.style.borderRadius = '14px';
        card.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.08)';
        card.style.padding = '1.2rem';

        const titleElement = card.querySelector('.benchmark-video-title');
        if (!titleElement) return;

        const rawTitle = titleElement.textContent.trim();
        const taskName = rawTitle.replace(/^Task\s+\d+:\s*/i, '');
        titleElement.textContent = `Task ${index + 1}: ${taskName}`;

        const oldBadge = card.querySelector('.benchmark-video-badge');
        if (oldBadge) {
            oldBadge.remove();
        }

        let instructionElement = card.querySelector('.benchmark-video-instruction');
        if (!instructionElement) {
            instructionElement = document.createElement('p');
            instructionElement.className = 'benchmark-video-instruction';
            titleElement.insertAdjacentElement('afterend', instructionElement);
        }

        instructionElement.innerHTML = `<strong>Instruction:</strong> ${getTaskInstruction(taskName)}`;
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Normalize benchmark cards and instruction text
    normalizeBenchmarkCards();

    // Setup autoplay+loop previews for benchmark task videos
    setupBenchmarkVideoAutoplay();

})
