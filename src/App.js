import React, { useState, useEffect } from "react";
import {
  Code,
  Server,
  Database,
  Globe,
  Book,
  MessageSquare,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Divide,
} from "lucide-react";

// Hover animation
const animationCSS = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
    }
  to {
    opacity: 1;
    transform: translateY(0);
    }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = animationCSS;
    document.head.appendChild(style);

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
      }`}
    >
      {/* Seo Part */}
      <div className="hidden">
        <h1>Mehmet Duman - Software Engineer & Computer Engineering Student</h1>
        <meta
          name="description"
          content="Mehmet Duman | Full-stack developer specializing in Java, Spring Boot, .NET Core, React, Angular, and MySQL. AWS Academy Graduate with experience in microservices and cloud computing."
        />
        <meta
          name="keywords"
          content="Mehmet Duman, Software Engineer, Computer Engineering, Java, Spring Boot, .NET Core, React, Angular, MySQL, AWS"
        />
        <meta
          property="og:title"
          content="Mehmet Duman - Software Engineer & Computer Engineering Student"
        />
        <meta
          property="og:description"
          content="Full-stack developer specializing in Java, Spring Boot, .NET Core, React, Angular, and MySQL. AWS Academy Graduate with experience in microservices and cloud computing."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Mehmet Duman - Software Engineer & Computer Engineering Student"
        />
        <meta
          name="twitter:description"
          content="Full-stack developer specializing in Java, Spring Boot, .NET Core, React, Angular, and MySQL. AWS Academy Graduate with experience in microservices and cloud computing."
        />
      </div>
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "#fff" : "#1e293b",
          color: darkMode ? "#1e293b" : "#fff",
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-colors duration-300 backdrop-blur-lg ${
          darkMode
            ? "bg-gray-900/80 shadow-lg shadow-indigo-500/10"
            : "bg-white/80 shadow-sm"
        }`}
      >
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a
              href="#home"
              className={`text-2xl font-bold ${
                darkMode ? "text-indigo-400" : "text-blue-700"
              } relative group overflow-hidden`}
            >
              <span className="relative z-10">Hyscop</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                  darkMode ? "bg-indigo-400" : "bg-blue-700"
                } group-hover:w-full transition-all duration-300`}
              ></span>
            </a>

            {/* Mobile Menu Button */}

            <button
              className="block md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                href="#home"
                active={activeSection === "home"}
                darkMode={darkMode}
              >
                Home
              </NavLink>
              <NavLink
                href="#about"
                active={activeSection === "about"}
                darkMode={darkMode}
              >
                About
              </NavLink>
              <NavLink
                href="#experience"
                active={activeSection === "experience"}
                darkMode={darkMode}
              >
                Experience
              </NavLink>
              <NavLink
                href="#education"
                active={activeSection === "education"}
                darkMode={darkMode}
              >
                Education
              </NavLink>
              <NavLink
                href="#skills"
                active={activeSection === "skills"}
                darkMode={darkMode}
              >
                Skills
              </NavLink>
              <NavLink
                href="#contact"
                active={activeSection === "contact"}
                darkMode={darkMode}
              >
                Contact
              </NavLink>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="flex flex-col space-y-4">
                <MobileNavLink
                  href="#home"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="#experience"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Experience
                </MobileNavLink>
                <MobileNavLink
                  href="#education"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Education
                </MobileNavLink>
                <MobileNavLink
                  href="#skills"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Skills
                </MobileNavLink>
                <MobileNavLink
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </MobileNavLink>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="pt-23 pb-12 md:pt-32 md:pb-24 realative">
        <div className="container mc-auto px-6 relative z-10">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="overflow-hidden">
                <h1
                  className={`text-4xl md:text-6xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  } animate-fade-in-up`}
                  style={{ animationDelay: "0.3s" }}
                >
                  Mehmet{" "}
                  <span
                    className={`${
                      darkMode ? "text-indigo-400" : "text-blue-600"
                    }`}
                  >
                    Duman
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const NavLink = ({ href, children, active, darkMode }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition relative group ${
        active
          ? darkMode
            ? "text-indigo-400"
            : "text-[#123458]"
          : darkMode
          ? "text-gray-300 hover:text-indigo-400"
          : "text-[#030303]/80 hover:text-[#123458]"
      }`}
    >
      {children}
      <span
        className={`absolute left-0 bottom-0 h-0.5 ${
          active
            ? darkMode
              ? "bg-indigo-400 w-full"
              : "bg-[#123458] w-full"
            : "w-0 group-hover:w-full transition-all duration-300"
        } ${darkMode ? "bg-indigo-400" : "bg-[#123458]"}`}
      ></span>
    </a>
  );
};

const MobileNavLink = ({ href, children, onClick, darkMode }) => {
  return (
    <a
      href={href}
      className={`block py-2 transition ${
        darkMode
          ? "text-gray-300 hover:text-indigo-400"
          : "text-[#030303]/80 hover:text-[#123458]"
      }`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default App;
