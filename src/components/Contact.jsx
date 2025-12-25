import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Music,
  MapPin,
  Send,
  Terminal,
} from "lucide-react";

const Contact = ({ onOpenAdmin }) => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const socialLinks = [
    {
      href: "https://github.com/Hyscop",
      icon: Github,
      label: "GitHub",
      username: "@Hyscop",
    },
    {
      href: "https://linkedin.com/in/mehmetduman3",
      icon: Linkedin,
      label: "LinkedIn",
      username: "mehmetduman3",
    },
    {
      href: "https://x.com/hyscopp",
      icon: Twitter,
      label: "X (Twitter)",
      username: "@hyscopp",
    },
    {
      href: "https://www.instagram.com/mehmett.dmnn/",
      icon: Instagram,
      label: "Instagram",
      username: "@mehmett.dmnn",
    },
    {
      href: "https://open.spotify.com/user/11183992403",
      icon: Music,
      label: "Spotify",
      username: "Mehmet",
    },
  ];

  // Scroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();

    if (!command) return;

    // Add command to history
    const newEntry = { command: terminalInput, response: null, type: null };

    if (command === "admin") {
      newEntry.response = "Access granted. Opening admin panel...";
      newEntry.type = "success";
      setTerminalHistory([...terminalHistory, newEntry]);
      setTerminalInput("");

      // Open admin panel after a short delay
      setTimeout(() => {
        onOpenAdmin?.();
      }, 500);
    } else if (command === "help") {
      newEntry.response = "Available commands: help, clear, whoami, status";
      newEntry.type = "info";
      setTerminalHistory([...terminalHistory, newEntry]);
    } else if (command === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (command === "whoami") {
      newEntry.response = "visitor@hyscop.com";
      newEntry.type = "info";
      setTerminalHistory([...terminalHistory, newEntry]);
    } else if (command === "status") {
      newEntry.response = "All systems operational ✓";
      newEntry.type = "success";
      setTerminalHistory([...terminalHistory, newEntry]);
    } else {
      newEntry.response = `bash: ${terminalInput}: command not found`;
      newEntry.type = "error";
      setTerminalHistory([...terminalHistory, newEntry]);
    }

    setTerminalInput("");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">Contact</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
          <p className="text-gray-400 mt-4">{"// Let's Connect"}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <div className="cyber-card p-8 md:p-12 rounded-lg text-center mb-12">
            <div className="w-20 h-20 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-6 pulse-glow">
              <Terminal className="w-10 h-10 text-cyan-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get In Touch
            </h3>

            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              I'm currently open to new opportunities and collaborations.
              Whether you have a question, a project idea, or just want to say
              hi, my inbox is always open!
            </p>

            {/* Email Button */}
            <a
              href="mailto:mehmetduman.dev@gmail.com"
              className="cyber-button inline-flex items-center gap-2 mb-8"
            >
              <Send className="w-5 h-5" />
              Say Hello
            </a>

            {/* Email Display */}
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <Mail className="w-5 h-5 text-cyan-400" />
              <a
                href="mailto:mehmetduman.dev@gmail.com"
                className="hover:text-cyan-400 transition-colors font-mono"
              >
                mehmetduman.dev@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Turkey</span>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {socialLinks.map(({ href, icon: Icon, label, username }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-card p-4 rounded-lg text-center hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:text-fuchsia-400 transition-colors" />
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-500 text-xs mt-1 truncate">
                  {username}
                </p>
              </a>
            ))}
          </div>

          {/* Interactive Terminal */}
          <div
            className="mt-12 p-6 bg-[#0a0a0f] border border-cyan-500/20 rounded-lg font-mono text-sm cursor-text"
            onClick={handleTerminalClick}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-500 ml-2">contact.sh</span>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="space-y-2 max-h-64 overflow-y-auto"
            >
              {/* Static content */}
              <p>
                <span className="text-cyan-400">$</span>{" "}
                <span className="text-gray-400">whoami</span>
              </p>
              <p className="text-green-400">
                Mehmet Duman - Software Developer
              </p>
              <p>
                <span className="text-cyan-400">$</span>{" "}
                <span className="text-gray-400">cat status.txt</span>
              </p>
              <p className="text-yellow-400">
                Available for work and collaboration
              </p>
              <p>
                <span className="text-cyan-400">$</span>{" "}
                <span className="text-gray-400">echo $RESPONSE_TIME</span>
              </p>
              <p className="text-fuchsia-400">Usually within 24 hours</p>

              {/* Dynamic history */}
              {terminalHistory.map((entry, index) => (
                <div key={index}>
                  <p>
                    <span className="text-cyan-400">$</span>{" "}
                    <span className="text-gray-400">{entry.command}</span>
                  </p>
                  {entry.response && (
                    <p
                      className={
                        entry.type === "error"
                          ? "text-red-400"
                          : entry.type === "success"
                          ? "text-green-400"
                          : "text-cyan-400"
                      }
                    >
                      {entry.response}
                    </p>
                  )}
                </div>
              ))}

              {/* Input line */}
              <form
                onSubmit={handleTerminalSubmit}
                className="flex items-center"
              >
                <span className="text-cyan-400">$</span>
                <span className="ml-1 inline-flex">
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="bg-transparent text-gray-300 outline-none caret-transparent w-auto"
                    style={{ width: `${Math.max(terminalInput.length, 1)}ch` }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="typing-cursor"></span>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
