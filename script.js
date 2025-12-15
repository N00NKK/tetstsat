document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header Functionality ---
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    
    // Observer to detect when the user scrolls past the hero section
    const heroObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                // User is in the hero section (at the top), keep header subtle
                header.style.backgroundColor = 'var(--color-glass)';
            } else {
                // User has scrolled past the hero, make the header slightly more opaque
                header.style.backgroundColor = 'rgba(10, 10, 14, 0.9)'; // Darker background
            }
        },
        { 
            rootMargin: '-10px 0px 0px 0px', // Trigger slightly before the header leaves the viewport
            threshold: 0.1 
        }
    );

    if (heroSection) {
        heroObserver.observe(heroSection);
    }


    // --- 2. Scrollytelling Feature Highlight ---
    const featureBlocks = document.querySelectorAll('.feature-block');
    const productViewer = document.querySelector('.product-viewer');

    const scrollyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const block = entry.target;
                const visualIndex = block.getAttribute('data-visual');

                if (entry.isIntersecting) {
                    // Highlight the currently visible feature block
                    featureBlocks.forEach(b => b.classList.remove('is-active'));
                    block.classList.add('is-active');

                    // Update the fixed visual based on the active block
                    productViewer.innerHTML = `
                        <div style="font-size: 1.2rem; font-weight: 600;">
                            ✨ Visualizing Feature ${visualIndex}
                        </div>
                        <p style="font-size: 0.9rem; color: var(--color-accent);">
                            ${block.querySelector('h3').textContent}
                        </p>
                    `;
                }
            });
        },
        { 
            rootMargin: '-50% 0px -50% 0px', // Center the intersection trigger in the viewport
            threshold: 0 // We just need to know when the center of the element passes the center of the screen
        }
    );

    featureBlocks.forEach(block => {
        scrollyObserver.observe(block);
    });


    // --- 3. Demo Tab Functionality ---
    const demoTabs = document.querySelectorAll('.demo-tabs button');
    const demoContentPanel = document.querySelector('.demo-content-panel');

    const demoContent = {
        '1': '<p><strong>Data View:</strong> Real-time feed of all mission-critical metrics displayed in a stunning, minimalist dashboard. <br> *(Mockup of charts and graphs would go here)*</p>',
        '2': '<p><strong>Analytics:</strong> Deep dive into AI-driven insights. Visualize projected trends and optimize strategies instantly. <br> *(Mockup of trend lines and prediction models)*</p>',
        '3': '<p><strong>Settings:</strong> Manage users, security protocols, and integration keys from a unified, intuitive panel. <br> *(Mockup of toggles and configuration fields)*</p>'
    };

    function updateDemoContent(tabId) {
        demoContentPanel.innerHTML = demoContent[tabId] || '<p>Content not available.</p>';
    }

    demoTabs.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // 1. Update tab active state
            demoTabs.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Update content with a slight fade effect for a smooth transition
            demoContentPanel.style.opacity = 0;
            setTimeout(() => {
                updateDemoContent(tabId);
                demoContentPanel.style.opacity = 1;
            }, 150); // Small delay for the fade transition
        });
    });

    // Initialize the demo content with the first tab
    updateDemoContent('1');
    demoContentPanel.style.transition = 'opacity 0.2s ease-in-out'; // Add transition to the panel
});
