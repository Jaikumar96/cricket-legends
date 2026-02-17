// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const playerCards = document.querySelectorAll('.player-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-role');
            
            // Filter player cards
            playerCards.forEach(card => {
                const cardRole = card.getAttribute('data-role');
                
                if (filterValue === 'all' || cardRole === filterValue) {
                    card.style.display = 'block';
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Add hover sound effect (optional - can be commented out)
    playerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click to flip functionality for mobile
    let isFlipped = new Set();
    
    playerCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const cardInner = this.querySelector('.card-inner');
                
                if (isFlipped.has(index)) {
                    cardInner.style.transform = 'rotateY(0deg)';
                    isFlipped.delete(index);
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                    isFlipped.add(index);
                }
            }
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollPosition = window.pageYOffset;
        header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        header.style.opacity = 1 - (scrollPosition / 500);
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Counter animation for stats when card is flipped
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerHTML = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    playerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            const activeButton = document.querySelector('.filter-btn.active');
            const nextButton = activeButton.nextElementSibling;
            if (nextButton && nextButton.classList.contains('filter-btn')) {
                nextButton.click();
            }
        } else if (e.key === 'ArrowLeft') {
            const activeButton = document.querySelector('.filter-btn.active');
            const prevButton = activeButton.previousElementSibling;
            if (prevButton && prevButton.classList.contains('filter-btn')) {
                prevButton.click();
            }
        }
    });

    // Create floating cricket balls animation
    function createCricketBall() {
        const ball = document.createElement('div');
        ball.innerHTML = '🏏';
        ball.style.position = 'fixed';
        ball.style.fontSize = '30px';
        ball.style.left = Math.random() * window.innerWidth + 'px';
        ball.style.top = '-50px';
        ball.style.opacity = '0.3';
        ball.style.zIndex = '0';
        ball.style.pointerEvents = 'none';
        ball.style.animation = 'fall 10s linear';
        
        document.body.appendChild(ball);
        
        setTimeout(() => {
            ball.remove();
        }, 10000);
    }

    // Create falling cricket balls periodically
    setInterval(createCricketBall, 5000);

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add search functionality (bonus feature)
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = '🔍 Search players...';
    searchBar.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 15px 25px;
        margin: 20px auto;
        display: block;
        border: 2px solid white;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        border-radius: 50px;
        outline: none;
        transition: all 0.3s ease;
    `;

    const filterSection = document.querySelector('.filter-section');
    filterSection.parentNode.insertBefore(searchBar, filterSection);

    searchBar.addEventListener('focus', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'scale(1.05)';
    });

    searchBar.addEventListener('blur', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.transform = 'scale(1)';
    });

    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        playerCards.forEach(card => {
            const playerName = card.querySelector('.player-name').textContent.toLowerCase();
            const playerCountry = card.querySelector('.player-country').textContent.toLowerCase();
            const playerRole = card.querySelector('.player-role').textContent.toLowerCase();
            
            if (playerName.includes(searchTerm) || 
                playerCountry.includes(searchTerm) || 
                playerRole.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('show');
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });
        
        // Reset filters when searching
        if (searchTerm === '') {
            filterButtons[0].click(); // Click "All Players" button
        }
    });

    // Add a visitor counter (simulated)
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 15px 25px;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        border: 2px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
        font-size: 0.9rem;
    `;
    
    const visits = Math.floor(Math.random() * 10000) + 50000;
    counter.textContent = `👀 ${visits.toLocaleString()} Views`;
    document.body.appendChild(counter);

    // Add smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Log welcome message
    console.log('%c🏏 Welcome to Cricket Legends! 🏏', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cExplore the greatest cricket players of all time!', 'color: #f093fb; font-size: 14px;');
});
