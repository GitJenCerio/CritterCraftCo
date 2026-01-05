// Component Loader - Loads reusable HTML components

export async function loadComponent(componentName) {
    try {
        // Determine if we're in pages/ directory or root
        const isInPages = window.location.pathname.includes('/pages/');
        const basePath = isInPages ? '../components/' : './components/';
        
        const response = await fetch(`${basePath}${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        return '';
    }
}

export async function loadHeader() {
    const headerHtml = await loadComponent('header');
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHtml;
        setupMobileMenu();
        setActiveNavLink();
    }
}

export async function loadFooter() {
    const footerHtml = await loadComponent('footer');
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    }
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    // Get mobile nav (the one that's hidden on desktop)
    const nav = document.querySelector('.nav.d-md-none');
    
    if (toggle && nav) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a nav link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Fix paths for pages directory
    const isInPages = currentPath.includes('/pages/');
    if (isInPages) {
        const logoLink = document.getElementById('logo-link');
        const logoImg = document.getElementById('logo-img');
        const cartLink = document.getElementById('cart-link');
        const cartImg = document.getElementById('cart-img');
        
        if (logoLink) logoLink.href = '../index.html';
        if (logoImg) logoImg.src = '../public/images/logo.png';
        if (cartLink) cartLink.href = './cart.html';
        if (cartImg) cartImg.src = '../public/images/icon-cart.png';
        
        // Fix nav links (desktop)
        const navHome = document.getElementById('nav-home');
        const navAbout = document.getElementById('nav-about');
        const navShop = document.getElementById('nav-shop');
        const navContact = document.getElementById('nav-contact');
        
        if (navHome) navHome.href = '../index.html';
        if (navAbout) navAbout.href = './about.html';
        if (navShop) navShop.href = './shop.html';
        if (navContact) navContact.href = './contact.html';

        // Fix nav links (mobile)
        const navHomeMobile = document.getElementById('nav-home-mobile');
        const navAboutMobile = document.getElementById('nav-about-mobile');
        const navShopMobile = document.getElementById('nav-shop-mobile');
        const navContactMobile = document.getElementById('nav-contact-mobile');
        
        if (navHomeMobile) navHomeMobile.href = '../index.html';
        if (navAboutMobile) navAboutMobile.href = './about.html';
        if (navShopMobile) navShopMobile.href = './shop.html';
        if (navContactMobile) navContactMobile.href = './contact.html';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const page = link.getAttribute('data-page');
        
        if (currentPath.includes(page) || 
            (currentPath.endsWith('index.html') && page === 'home') ||
            (currentPath.endsWith('/') && page === 'home') ||
            (currentPath === '/' && page === 'home')) {
            link.classList.add('active');
            // Also activate the corresponding mobile/desktop link
            const linkId = link.id;
            if (linkId.includes('-mobile')) {
                const desktopId = linkId.replace('-mobile', '');
                const desktopLink = document.getElementById(desktopId);
                if (desktopLink) desktopLink.classList.add('active');
            } else {
                const mobileId = linkId + '-mobile';
                const mobileLink = document.getElementById(mobileId);
                if (mobileLink) mobileLink.classList.add('active');
            }
        }
    });
}

