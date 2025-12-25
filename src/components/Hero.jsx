import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  Music,
  ChevronDown,
} from "lucide-react";
import profilePhoto from "../images/IMG_7668.JPEG";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Software Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { href: "https://github.com/Hyscop", icon: Github, label: "Github" },
    {
      href: "https://linkedin.com/in/mehmetduman3",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "https://x.com/hyscopp", icon: Twitter, label: "X" },
    {
      href: "https://www.instagram.com/mehmett.dmnn/",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://open.spotify.com/user/11183992403",
      icon: Music,
      label: "Spotify",
    },
    { href: "mailto:mehmetduman.dev@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fuchsia-500/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-500/5 mb-6 fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">
                Available for opportunities
              </span>
            </div>

            {/* Name with Glitch Effect */}
            <h1
              className="text-5xl md:text-7xl font-bold mb-4 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="glitch-text text-white" data-text="Mehmet">
                Mehmet
              </span>
              <br />
              <span className="neon-text">Duman</span>
            </h1>

            {/* Title with Typing Effect */}
            <div
              className="text-xl md:text-2xl mb-6 h-8 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="text-gray-400">&gt; </span>
              <span className="text-fuchsia-400">{displayText}</span>
              <span className="typing-cursor" />
            </div>

            {/* Subtitle */}
            <p
              className="text-gray-400 text-lg max-w-xl mb-8 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              Computer Engineer crafting scalable solutions with{" "}
              <span className="text-cyan-400">Java</span>,{" "}
              <span className="text-fuchsia-400">Spring Boot</span>,{" "}
              <span className="text-purple-400">.NET Core</span> &{" "}
              <span className="text-cyan-400">React</span>
            </p>

            {/* Social Links */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <a href="#contact" className="cyber-button">
                Get in Touch
              </a>
              <a href="#projects" className="cyber-button cyber-button-magenta">
                View Projects
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className="lg:w-1/2 flex justify-center fade-in-right"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div
                className="absolute -inset-4 border-2 border-cyan-500/30 transform rotate-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
              />
              <div
                className="absolute -inset-4 border-2 border-fuchsia-500/30 transform -rotate-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
              />

              {/* Image Container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 overflow-hidden cyber-card p-1">
                <img
                  src={profilePhoto}
                  alt="Mehmet Duman - Software Engineer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 40%" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-400" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-fuchsia-400" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-fuchsia-400" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -right-4 top-1/4 px-4 py-2 bg-[#12121a]/95 border border-cyan-500/30">
                <div className="text-xs text-gray-400">Experience</div>
                <div className="text-lg font-bold text-cyan-400">2+ Years</div>
              </div>
              <div className="absolute -left-4 bottom-1/4 px-4 py-2 bg-[#12121a]/95 border border-fuchsia-500/30">
                <div className="text-xs text-gray-400">Focused On</div>
                <div className="text-lg font-bold text-fuchsia-400">
                  Backend
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
