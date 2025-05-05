import React, { useState, useEffect } from "react";
import profilePhoto from "./images/IMG_7925.png";
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
  Music,
} from "lucide-react";

// Simplified animations only for hovers
const animationsCSS = `
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

const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);

  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = animationsCSS;
    document.head.appendChild(style);

    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
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
      {/* SEO Optimization */}
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
              <span className="relative z-10">MD</span>
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

            {/* Desktop Navigation */}
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
      <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 relative">
        <div className="container mx-auto px-6 relative z-10">
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
              <div className="overflow-hidden">
                <h2
                  className={`text-xl md:text-2xl mb-6 animate-fade-in-up ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                >
                  Software Developer & Computer Engineering Student
                </h2>
              </div>
              <div className="overflow-hidden">
                <p
                  className={`mb-8 max-w-lg animate-fade-in-up ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                  style={{ animationDelay: "0.7s" }}
                >
                  Passionate about building scalable and efficient software
                  solutions with expertise in Java, Spring Boot, .NET Core,
                  React, Angular, and MySQL.
                </p>
              </div>
              <div
                className="flex flex-wrap space-x-3 animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <SocialLink
                  href="https://github.com/Hyscop"
                  icon={<Github size={20} />}
                  label="Github"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://linkedin.com/in/mehmetduman3"
                  icon={<Linkedin size={20} />}
                  label="LinkedIn"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://x.com/hyscopp"
                  icon={<Twitter size={20} />}
                  label="X"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://www.instagram.com/mehmett.dmnn/"
                  icon={<Instagram size={20} />}
                  label="Instagram"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://open.spotify.com/user/11183992403"
                  icon={<Music size={20} />}
                  label="Spotify"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="mailto:mduman2003@gmail.com"
                  icon={<Mail size={20} />}
                  label="Email"
                  darkMode={darkMode}
                />
              </div>
            </div>
            <div
              className="md:w-2/5 relative animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              <div
                className={`absolute inset-0 rounded-2xl -rotate-6 scale-95 ${
                  darkMode ? "bg-indigo-600/20" : "bg-blue-400/20"
                } backdrop-blur-sm`}
              ></div>
              <div
                className={`absolute inset-0 rounded-2xl rotate-3 scale-95 ${
                  darkMode ? "bg-violet-600/20" : "bg-purple-400/20"
                } backdrop-blur-sm`}
              ></div>
              <div
                className={`relative ${
                  darkMode
                    ? "bg-gradient-to-br from-indigo-800/80 to-violet-700/80"
                    : "bg-gradient-to-br from-blue-600 to-indigo-500"
                } rounded-2xl p-1 shadow-xl backdrop-blur-sm`}
              >
                <div
                  className={`${
                    darkMode ? "bg-gray-900" : "bg-white"
                  } rounded-xl p-6`}
                >
                  <div
                    className={`flex items-center justify-center w-full h-64 ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    } rounded-lg overflow-hidden `}
                  >
                    <img
                      src={profilePhoto}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      alt="Mehmet Duman - Software Engineer"
                      className="rounded-lg hover:scale-105 transition-transform duration-500 object-cover object-top w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-16 relative overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle darkMode={darkMode}>About Me</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <div
              className={`p-8 rounded-2xl ${
                darkMode
                  ? "bg-gray-900/80 shadow-lg shadow-indigo-500/10"
                  : "bg-white/80 shadow-xl"
              } transform hover:scale-[1.01] transition-all duration-300`}
            >
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                As a Computer Engineering student at Eskişehir Technical
                University, I'm passionate about building scalable and efficient
                software solutions that make a difference. I approach each
                project with both technical precision and creative
                problem-solving, constantly seeking opportunities to expand my
                knowledge and skills in the ever-evolving tech landscape.
              </p>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                My technical toolkit includes Java, Spring Boot, .NET Core,
                React, Angular, and MySQL, complemented by a solid understanding
                of Microservices architecture and Docker containerization. As an
                AWS Academy Graduate, I bring cloud computing expertise that
                enhances my ability to design and implement comprehensive
                solutions. Currently, I'm exploring the exciting realms of AI
                and Machine Learning, strengthening my capabilities in Python,
                data analysis, and AI model development.
              </p>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Beyond the code, music is an essential part of my life,
                providing inspiration and balance to my technical pursuits. When
                I'm not developing software, you'll likely find me engaged in
                competitive table tennis matches or unwinding with video games
                across various genres. And if you're wondering about the cat
                photos that might occasionally appear on my desk—yes, I'm
                unabashedly a cat person!
              </p>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I thrive in collaborative environments where diverse
                perspectives converge to solve complex challenges. Whether
                working independently or as part of a team, I remain dedicated
                to continuous learning and innovation always eager to create
                elegant solutions that address real-world problems while
                maintaining a healthy work-life balance through my personal
                interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6">
          <SectionTitle darkMode={darkMode}>
            Professional Experience
          </SectionTitle>

          <div className="max-w-4xl mx-auto space-y-8">
            <ExperienceCard
              title="Software Development Intern"
              company="SİSTAŞ SAYISAL İLETİŞİM SAN. VE TİC. A.Ş."
              location="Istanbul, Turkey"
              duration="Jan 2025 - Feb 2025"
              description={[
                "Worked on a auction-app project using Java Spring Boot, Angular, and JHipster microservices",
                "Designed and implemented multi-layered architecture for robust application development",
                "Integrated MySQL for database management and optimization",
                "Utilized GitHub for version control in a collaborative development environment",
                "Contributed to optimizing backend logic and ensuring seamless frontend-backend communication",
                "Gained practical experience in microservices ecosystem development",
              ]}
              darkMode={darkMode}
            />

            <ExperienceCard
              title="Software Engineering Intern"
              company="TEI - TUSAŞ Engine Industries"
              location="Eskişehir, Turkey"
              duration="Aug 2024 - Sep 2024"
              description={[
                "Developed RESTful APIs using .NET Core and C#",
                "Managed database operations with Entity Framework Core",
                "Increased code quality and reliability through Test-Driven Development (TDD)",
                "Wrote comprehensive unit and integration tests to ensure application stability",
                "Documented and tested APIs using Swagger UI",
                "Simplified model transformations with AutoMapper",
                "Organized code structure using the Repository Pattern",
                "Used Git & GitHub for version control and team collaboration",
                "Collaborated with the development team to ensure smooth project delivery",
              ]}
              darkMode={darkMode}
            />

            <ExperienceCard
              title="Core Team Member"
              company="Google Developer Student Clubs (GDSC)"
              location="Eskişehir, Turkey"
              duration="Sep 2023 - Jun 2024"
              description={[
                "Planned and executed various technical workshops and events",
                "Collaborated effectively with team members from diverse disciplines",
                "Enhanced leadership, time management, and strategic thinking skills",
                "Developed proactive communication and problem-solving abilities",
              ]}
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="container mx-auto px-6">
          <SectionTitle darkMode={darkMode}>Education</SectionTitle>

          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Timeline connector */}
            <div
              className={`absolute left-6 top-8 bottom-8 w-1 ${
                darkMode ? "bg-indigo-500/30" : "bg-blue-200"
              } hidden md:block`}
            ></div>

            <EducationCard
              institution="Eskişehir Technical University"
              degree="Bachelor of Science in Computer Engineering"
              location="Eskişehir, Turkey"
              duration="Sep 2021 - Present"
              darkMode={darkMode}
            />

            <EducationCard
              institution="Egefen Anatolian High School"
              degree="High School Diploma"
              location="Aydın, Turkey"
              duration="Sep 2017 - Jul 2021"
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6">
          <SectionTitle darkMode={darkMode}>Technical Skills</SectionTitle>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillCategory
              title="Languages"
              icon={<Code />}
              skills={[
                "Java",
                "C#",
                "Python",
                "SQL",
                "HTML",
                "CSS",
                "JavaScript",
              ]}
              darkMode={darkMode}
            />

            <SkillCategory
              title="Frameworks & Libraries"
              icon={<Server />}
              skills={[
                "Spring Boot",
                ".NET Core",
                "Entity Framework Core",
                "Angular",
                "ReactJS",
                "Bootstrap",
              ]}
              darkMode={darkMode}
            />

            <SkillCategory
              title="Tools & Technologies"
              icon={<Database />}
              skills={[
                "Git",
                "MySQL",
                "RESTful APIs",
                "Microservices",
                "Docker",
                "TDD",
                "Swagger UI",
                "AutoMapper",
              ]}
              darkMode={darkMode}
            />

            <SkillCategory
              title="Cloud Technologies"
              icon={<Globe />}
              skills={["AWS (Academy Cloud Foundations certified)"]}
              darkMode={darkMode}
            />
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <h3
              className={`text-xl font-semibold mb-4 flex items-center ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <Book
                className={`mr-2 ${
                  darkMode ? "text-indigo-400" : "text-blue-600"
                }`}
              />
              Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LanguageCard
                language="Turkish"
                level="Native"
                darkMode={darkMode}
              />
              <LanguageCard
                language="English"
                level="Proficient"
                details="C1 listening, C1 reading, B2 writing, C1 speaking"
                darkMode={darkMode}
              />
              <LanguageCard
                language="German"
                level="Beginner"
                details="A2 listening, A1 reading, A1 writing, A1 speaking"
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <h3
              className={`text-xl font-semibold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Certifications
            </h3>
            <div
              className={`${
                darkMode
                  ? "bg-gray-800 border border-indigo-500/30"
                  : "bg-white"
              } rounded-lg shadow-lg p-6 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        darkMode ? "bg-indigo-900/50" : "bg-blue-100"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          darkMode ? "text-indigo-300" : "text-blue-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        AWS Academy Graduate - AWS Academy Cloud Foundations
                      </h4>
                      <p
                        className={`mt-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Amazon Web Services (AWS)
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm mt-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Credential ID: b00c6153-2845-479f-b9a9-9e8fea9920d6
                  </p>
                  <ul
                    className={`mt-3 ml-5 list-disc ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <li>
                      Completed Introduction to Cloud Computing course, learning
                      the fundamentals of cloud technology
                    </li>
                  </ul>
                  <a
                    href="https://credly.com/badges/b00c6153-2845-479f-b9a9-9e8fea9920d6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center mt-3 ${
                      darkMode
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-blue-600 hover:text-blue-800"
                    } transition-all`}
                  >
                    View Credential <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode
                        ? "bg-indigo-900/50 text-indigo-300"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    Jan 2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-16 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } relative overflow-hidden`}
      >
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle darkMode={darkMode}>Contact Me</SectionTitle>

          <div className="max-w-4xl mx-auto">
            <p
              className={`text-center text-lg mb-12 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Feel free to reach out to me for collaboration or opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ContactCard
                icon={<Mail />}
                title="Email"
                info="mduman2003@gmail.com"
                link="mailto:mduman2003@gmail.com"
                darkMode={darkMode}
              />

              <ContactCard
                icon={<Phone />}
                title="Phone"
                info="+90 544 719 1494"
                link="tel:+905447191494"
                darkMode={darkMode}
              />

              <ContactCard
                icon={<MessageSquare />}
                title="Social Media"
                info="Connect on LinkedIn"
                link="https://linkedin.com/in/mehmetduman3"
                darkMode={darkMode}
              />
            </div>

            <div
              className={`mt-12 p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-900/70 border border-indigo-500/20"
                  : "bg-blue-50/80"
              } text-center`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Let's Connect
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <SocialLink
                  href="https://github.com/Hyscop"
                  icon={<Github size={20} />}
                  label="Github"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://linkedin.com/in/mehmetduman3"
                  icon={<Linkedin size={20} />}
                  label="LinkedIn"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://x.com/hyscopp"
                  icon={<Twitter size={20} />}
                  label="X"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="https://www.instagram.com/mehmett.dmnn/"
                  icon={<Instagram size={20} />}
                  label="Instagram"
                  darkMode={darkMode}
                />
                <SocialLink
                  href="mailto:mduman2003@gmail.com"
                  icon={<Mail size={20} />}
                  label="Email"
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-900 text-white"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <div
                  className={`text-2xl font-bold ${
                    darkMode ? "text-indigo-400" : "text-blue-400"
                  } mr-2`}
                >
                  MD
                </div>
                <div className="h-6 w-px bg-gray-700 mx-3"></div>
                <p>
                  &copy; {new Date().getFullYear()} Mehmet Duman. All rights
                  reserved.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Hyscop"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-400 hover:text-blue-400"
                } transition-all duration-300 transform hover:scale-110`}
                aria-label="Github"
              >
                <Github />
              </a>
              <a
                href="https://linkedin.com/in/mehmetduman3"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-400 hover:text-blue-400"
                } transition-all duration-300 transform hover:scale-110`}
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href="https://x.com/hyscopp"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-400 hover:text-blue-400"
                } transition-all duration-300 transform hover:scale-110`}
                aria-label="X"
              >
                <Twitter />
              </a>
              <a
                href="https://www.instagram.com/mehmett.dmnn/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-400 hover:text-blue-400"
                } transition-all duration-300 transform hover:scale-110`}
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href="mailto:mduman2003@gmail.com"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-400 hover:text-blue-400"
                } transition-all duration-300 transform hover:scale-110`}
                aria-label="Email"
              >
                <Mail />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>Built with React and Tailwind CSS | Last updated: April 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Components
const NavLink = ({ href, children, active, darkMode }) => {
  const sectionId = href.substring(1);

  return (
    <a
      href={href}
      onClick={(e) => scrollToSection(e, sectionId)}
      className={`text-sm font-medium transition relative group ${
        active
          ? darkMode
            ? "text-indigo-400"
            : "text-blue-600"
          : darkMode
          ? "text-gray-300 hover:text-indigo-400"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
      <span
        className={`absolute left-0 bottom-0 h-0.5 ${
          active
            ? darkMode
              ? "bg-indigo-400 w-full"
              : "bg-blue-600 w-full"
            : "w-0 group-hover:w-full transition-all duration-300"
        } ${darkMode ? "bg-indigo-400" : "bg-blue-600"}`}
      ></span>
    </a>
  );
};

const MobileNavLink = ({ href, children, onClick, darkMode }) => {
  const sectionId = href.substring(1);

  return (
    <a
      href={href}
      className={`block py-2 transition ${
        darkMode
          ? "text-gray-300 hover:text-indigo-400"
          : "text-gray-700 hover:text-blue-600"
      }`}
      onClick={(e) => {
        scrollToSection(e, sectionId);
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );
};

const SocialLink = ({ href, icon, label, darkMode }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${
        darkMode
          ? "bg-gray-800 text-indigo-400 hover:bg-gray-700 hover:text-indigo-300"
          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
      } transition-all duration-300 transform hover:scale-110 mb-2 mr-1`}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const SectionTitle = ({ children, darkMode }) => {
  return (
    <h2 className="text-3xl font-bold text-center mb-12 relative">
      <span
        className={`relative z-10 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        {children}
      </span>
      <span
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 ${
          darkMode ? "bg-indigo-500" : "bg-blue-500"
        } rounded-full`}
      ></span>
    </h2>
  );
};

const ExperienceCard = ({
  title,
  company,
  location,
  duration,
  description,
  darkMode,
}) => {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 shadow-lg shadow-indigo-500/10"
          : "bg-white shadow-md"
      } rounded-lg p-6 border-l-4 ${
        darkMode ? "border-indigo-500" : "border-blue-500"
      } transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-lg mt-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {company}
          </p>
          <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {location}
          </p>
          <ul
            className={`mt-4 ml-5 list-disc space-y-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

const EducationCard = ({
  institution,
  degree,
  location,
  duration,
  darkMode,
}) => {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 shadow-lg shadow-indigo-500/10"
          : "bg-white shadow-md"
      } rounded-lg p-6 relative md:pl-16 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-6 top-8 w-4 h-4 rounded-full ${
          darkMode ? "bg-indigo-500" : "bg-blue-500"
        } hidden md:block`}
      ></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {institution}
          </h3>
          <p
            className={`text-lg mt-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {degree}
          </p>
          <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {location}
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

const SkillCategory = ({ title, icon, skills, darkMode }) => {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 shadow-lg shadow-indigo-500/10"
          : "bg-white shadow-md"
      } rounded-lg p-6 transition-all duration-500 hover:shadow-xl group`}
    >
      <h3
        className={`text-xl font-semibold mb-4 flex items-center ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <span
          className={`mr-2 transition-all duration-500 ${
            darkMode
              ? "text-indigo-400 group-hover:text-indigo-300"
              : "text-blue-600 group-hover:text-blue-500"
          }`}
        >
          {icon}
        </span>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-indigo-900/40 text-indigo-300 hover:bg-indigo-800/60"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const LanguageCard = ({ language, level, details, darkMode }) => {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 shadow-lg shadow-indigo-500/10"
          : "bg-white shadow-md"
      } rounded-lg p-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
    >
      <div
        className={`w-full h-1 rounded-t-full mb-3 ${
          language === "Turkish"
            ? darkMode
              ? "bg-red-600"
              : "bg-red-500"
            : language === "English"
            ? darkMode
              ? "bg-blue-600"
              : "bg-blue-500"
            : darkMode
            ? "bg-yellow-600"
            : "bg-yellow-500"
        }`}
      ></div>
      <h4
        className={`font-medium text-lg ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {language}
      </h4>
      <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {level}
      </p>
      {details && (
        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {details}
        </p>
      )}
    </div>
  );
};

const ContactCard = ({ icon, title, info, link, darkMode }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        darkMode
          ? "bg-gray-900/70 backdrop-blur-sm border border-indigo-500/20"
          : "bg-white/90 backdrop-blur-sm"
      } rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div
        className={`h-16 w-16 rounded-full ${
          darkMode
            ? "bg-indigo-900/50 text-indigo-300"
            : "bg-blue-100 text-blue-600"
        } flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h4
        className={`text-lg font-medium mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h4>
      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{info}</p>
    </a>
  );
};

export default App;
