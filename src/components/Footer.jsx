import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Terminal,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/Hyscop", icon: Github, label: "GitHub" },
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
    { href: "mailto:mehmetduman.dev@gmail.com", icon: Mail, label: "Email" },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#0a0a0f]">
      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 border-2 border-cyan-400 flex items-center justify-center"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-cyan-400">M</span>
                <span className="text-white">D</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Software Developer crafting digital experiences with modern
              technologies and creative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{"//"}</span> Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-fuchsia-400">{"//"}</span> Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Mehmet Duman. All rights reserved.
            </p>

            <p className="text-gray-600 text-xs font-mono">
              v2.0.0 // Last updated: Dec {currentYear}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-cyan-500/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-fuchsia-500/10" />
    </footer>
  );
};

export default Footer;
