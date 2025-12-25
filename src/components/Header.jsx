import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-sm border-cyan-500/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-10 h-10 border-2 border-cyan-400 flex items-center justify-center clip-path-cyber group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-300"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-[#0a0a0f] transition-colors" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-cyan-400">M</span>
              <span className="text-white">D</span>
              <span className="text-magenta-400 text-fuchsia-500">_</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm font-medium uppercase tracking-wider ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 border border-cyan-400/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-cyan-400 bg-cyan-400/10 border-l-2 border-cyan-400"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-cyan-400/50 mr-2">0{index + 1}.</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
