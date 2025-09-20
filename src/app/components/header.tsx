"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
    const [theme, setTheme] = useState('light'); // Start with light for SSR
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Apply the theme immediately on mount
    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsThemeLoaded(true);
    } catch (error) {
      console.warn('Theme initialization failed:', error);
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      setIsThemeLoaded(true);
    }
  }, []);

  // Apply theme to document immediately when theme changes
  useEffect(() => {
    if (isThemeLoaded) {
      try {
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        console.warn('Theme application failed:', error);
      }
    }
  }, [theme, isThemeLoaded]);

  // Prevent body scroll when mobile menu or mobile dropdown is open (not language dropdown)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const shouldLockScroll = isMobileMenuOpen || isMobileDropdownOpen;
    
    try {
      if (shouldLockScroll) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    } catch (error) {
      console.warn('Scroll lock failed:', error);
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      try {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      } catch (error) {
        console.warn('Scroll unlock failed:', error);
      }
    };
  }, [isMobileMenuOpen, isMobileDropdownOpen]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLanguageDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.language-switcher')) {
          setIsLanguageDropdownOpen(false);
        }
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileDropdownOpen(false);
  };

    const toggleMobileDropdown = () => {
        setIsMobileDropdownOpen(!isMobileDropdownOpen);
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    return (
        <main className='w-full'>
            <header className="header">
                <div className="container">
                    <div className="header-logo-wrapper" style={{ overflow: 'hidden' }}>
                        <a href="/" className="header-logo flex items-center">
                            <Image src="/logo.png" alt="Logo" width={65} height={65} />
                            <Image src="/full-logo.png" alt="Logo" width={200} height={200} className='hidden' />
                        </a>
                    </div>
                    <div className="links">
                        <nav className="nav-links">
                            <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                <a href="/" className="nav-link">Home</a>
                            </div>
                            <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                <a href="/about" className="nav-link">About</a>
                            </div>
                            
                            <div className="dropdown">
                                <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                    <a href="/services" className="nav-link dropdown-toggle">Services</a>
                                </div>
                                <div className="dropdown-menu">
                                    <div className="dropdown-content">
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/web" className="dropdown-item">Web</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/web#technologies" className="dropdown-subitem">React</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">Next.js</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">WordPress</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">Shopify</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">Vue.js</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">Angular</a>
                                                    <a href="/services/web#technologies" className="dropdown-subitem">Svelte</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/app" className="dropdown-item">App</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/app#technologies" className="dropdown-subitem">Flutter</a>
                                                    <a href="/services/app#technologies" className="dropdown-subitem">React Native</a>
                                                    <a href="/services/app#technologies" className="dropdown-subitem">Native Android (Java/Kotlin)</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/ai" className="dropdown-item">AI</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Agentic Ai</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Manual to ai based solutions</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Custom integration of Ai</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">NLP</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Google Cloud AI</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Machine learning</a>
                                                    <a href="/services/ai#technologies" className="dropdown-subitem">Business Ai solutions</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/custom-software" className="dropdown-item">Custom Software</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">Windows Applications</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">Desktop Applications</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">Enterprise Software</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">CRM Systems</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">ERP Solutions</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">System Integration</a>
                                                    <a href="/services/custom-software#technologies" className="dropdown-subitem">Process Automation</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                <a href="/process" className="nav-link">How We Do It</a>
                            </div>
                            <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                <a href="/contact" className="nav-link">Contact Us</a>
                            </div>
                        </nav>
                        
                        <div className="header-controls">
                            <button 
                                className="mobile-menu-toggle"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                                <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                                <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                            </button>
                            <button 
                                className="theme-toggle" 
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                <div className="theme-icon-container">
                                    <svg 
                                        className={`theme-icon ${isThemeLoaded && theme === 'light' ? 'active' : ''}`} 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                    <svg 
                                        className={`theme-icon ${isThemeLoaded && theme === 'dark' ? 'active' : ''}`} 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                </div>
                            </button>
                            <div className="language-switcher">
                                <button 
                                    className="language-toggle" 
                                    aria-label="Change language"
                                    onClick={toggleLanguageDropdown}
                                >
                                    <span className="language-icon">🌐</span>
                                    <span className="current-lang">EN</span>
                                </button>
                                <div className={`language-dropdown ${isLanguageDropdownOpen ? 'active' : ''}`}>
                                    <a href="#" className="language-option">English</a>
                                    <a href="#" className="language-option">العربية</a>
                                    <a href="#" className="language-option">Español</a>
                                    <a href="#" className="language-option">Français</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
                    <a href="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</a>
                    <a href="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</a>
                    
                    <div className="mobile-dropdown">
                        <button 
                            className={`mobile-dropdown-toggle ${isMobileDropdownOpen ? 'active' : ''}`}
                            onClick={toggleMobileDropdown}
                        >
                            Services
                        </button>
                        <div className={`mobile-dropdown-content ${isMobileDropdownOpen ? 'active' : ''}`}>
                            <div className="mobile-dropdown-section">
                                <a href="/services/web" className="mobile-dropdown-item" onClick={toggleMobileMenu}>Web</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>React</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Next.js</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>WordPress</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Shopify</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Vue.js</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Angular</a>
                                    <a href="/services/web#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Svelte</a>
                                </div>
                            </div>
                            <div className="mobile-dropdown-section">
                                <a href="/services/app" className="mobile-dropdown-item" onClick={toggleMobileMenu}>App</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/app#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Flutter</a>
                                    <a href="/services/app#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>React Native</a>
                                    <a href="/services/app#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Native Android (Java/Kotlin)</a>
                                </div>
                            </div>
                            <div className="mobile-dropdown-section">
                                <a href="/services/ai" className="mobile-dropdown-item" onClick={toggleMobileMenu}>AI</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Agentic Ai</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Manual to ai based solutions</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Custom integration of Ai</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>NLP</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Google Cloud AI</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Machine learning</a>
                                    <a href="/services/ai#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Business Ai solutions</a>
                                </div>
                            </div>
                            <div className="mobile-dropdown-section">
                                <a href="/services/custom-software" className="mobile-dropdown-item" onClick={toggleMobileMenu}>Custom Software</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Windows Applications</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Desktop Applications</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Enterprise Software</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>CRM Systems</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>ERP Solutions</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>System Integration</a>
                                    <a href="/services/custom-software#technologies" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Process Automation</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <a href="/process" className="mobile-nav-link" onClick={toggleMobileMenu}>How We Do It</a>
                    <a href="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact Us</a>
                    
                    {/* Mobile Language Switcher */}
                    <div className="mobile-language-switcher">
                        <button 
                            className="mobile-language-toggle" 
                            onClick={toggleLanguageDropdown}
                            aria-label="Change language"
                        >
                            <span className="mobile-language-icon">🌐</span>
                            <span className="mobile-current-lang">English</span>
                        </button>
                        <div className={`mobile-language-dropdown ${isLanguageDropdownOpen ? 'active' : ''}`}>
                            <a href="#" className="mobile-language-option" onClick={toggleMobileMenu}>English</a>
                            <a href="#" className="mobile-language-option" onClick={toggleMobileMenu}>العربية</a>
                            <a href="#" className="mobile-language-option" onClick={toggleMobileMenu}>Español</a>
                            <a href="#" className="mobile-language-option" onClick={toggleMobileMenu}>Français</a>
                        </div>
                    </div>
                </nav>
            </div>
        </main>
    );
}