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
};
