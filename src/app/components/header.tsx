"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [theme, setTheme] = useState('light'); // Always start with 'light' for SSR consistency
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Apply the theme immediately on mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsThemeLoaded(true);
  }, []);

  // Apply theme to document immediately when theme changes
  useEffect(() => {
    if (isThemeLoaded) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, isThemeLoaded]);

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
                        <div className="header-logo flex items-center">
                            <Image src="/logo.png" alt="Logo" width={65} height={65} />
                            <Image src="/full-logo.png" alt="Logo" width={200} height={200} className='hidden' />
                        </div>
                    </div>
                    <div className="links">
                        <nav className="nav-links">
                            <div className="nav-link-wrapper" style={{ overflow: 'hidden' }}>
                                <Link href="/" className="nav-link">Home</Link>
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
                                                    <a href="/services/web/react" className="dropdown-subitem">React</a>
                                                    <a href="/services/web/next" className="dropdown-subitem">Next.js</a>
                                                    <a href="/services/web/wordpress" className="dropdown-subitem">WordPress</a>
                                                    <a href="/services/web/vue" className="dropdown-subitem">Vue.js</a>
                                                    <a href="/services/web/angular" className="dropdown-subitem">Angular</a>
                                                    <a href="/services/web/svelte" className="dropdown-subitem">Svelte</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/app" className="dropdown-item">App</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/app/flutter" className="dropdown-subitem">Flutter</a>
                                                    <a href="/services/app/react-native" className="dropdown-subitem">React Native</a>
                                                    <a href="/services/app/android" className="dropdown-subitem">Native Android (Java/Kotlin)</a>
                                                    <a href="/services/app/ios" className="dropdown-subitem">Native iOS (Swift)</a>
                                                    <a href="/services/app/xamarin" className="dropdown-subitem">Xamarin</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-column">
                                            <div className="dropdown-submenu">
                                                <div className="dropdown-item-wrapper" style={{ overflow: 'hidden' }}>
                                                    <a href="/services/ai" className="dropdown-item">AI</a>
                                                </div>
                                                <div className="dropdown-submenu-content">
                                                    <a href="/services/ai/chatbots" className="dropdown-subitem">AI Chatbots</a>
                                                    <a href="/services/ai/automation" className="dropdown-subitem">Process Automation</a>
                                                    <a href="/services/ai/analytics" className="dropdown-subitem">Predictive Analytics</a>
                                                    <a href="/services/ai/computer-vision" className="dropdown-subitem">Computer Vision</a>
                                                    <a href="/services/ai/nlp" className="dropdown-subitem">Natural Language Processing</a>
                                                    <a href="/services/ai/ml-models" className="dropdown-subitem">Custom ML Models</a>
                                                    <a href="/services/ai/llm-integration" className="dropdown-subitem">LLM Integration</a>
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
                    <Link href="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
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
                                    <a href="/services/web/react" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>React</a>
                                    <a href="/services/web/next" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Next.js</a>
                                    <a href="/services/web/wordpress" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>WordPress</a>
                                    <a href="/services/web/vue" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Vue.js</a>
                                    <a href="/services/web/angular" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Angular</a>
                                    <a href="/services/web/svelte" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Svelte</a>
                                </div>
                            </div>
                            <div className="mobile-dropdown-section">
                                <a href="/services/app" className="mobile-dropdown-item" onClick={toggleMobileMenu}>App</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/app/flutter" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Flutter</a>
                                    <a href="/services/app/react-native" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>React Native</a>
                                    <a href="/services/app/android" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Native Android</a>
                                    <a href="/services/app/ios" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Native iOS</a>
                                    <a href="/services/app/xamarin" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Xamarin</a>
                                </div>
                            </div>
                            <div className="mobile-dropdown-section">
                                <a href="/services/ai" className="mobile-dropdown-item" onClick={toggleMobileMenu}>AI</a>
                                <div className="mobile-dropdown-sublinks">
                                    <a href="/services/ai/chatbots" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>AI Chatbots</a>
                                    <a href="/services/ai/automation" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Process Automation</a>
                                    <a href="/services/ai/analytics" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Predictive Analytics</a>
                                    <a href="/services/ai/computer-vision" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Computer Vision</a>
                                    <a href="/services/ai/nlp" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Natural Language Processing</a>
                                    <a href="/services/ai/ml-models" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>Custom ML Models</a>
                                    <a href="/services/ai/llm-integration" className="mobile-dropdown-sublink" onClick={toggleMobileMenu}>LLM Integration</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <a href="/process" className="mobile-nav-link" onClick={toggleMobileMenu}>How We Do It</a>
                    <a href="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact Us</a>
                </nav>
            </div>
        </main>
    );
}