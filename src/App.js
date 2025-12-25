import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Header,
  Hero,
  About,
  Experience,
  Education,
  Skills,
  Projects,
  Contact,
  Footer,
  AdminPanel,
} from "./components";
import ProjectDetail from "./components/ProjectDetail";
import { projectsApi } from "./lib/supabase";

// Home Page Component
const HomePage = ({ projects, loading, error, onOpenAdmin }) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 200;

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid-bg scanlines">
      <Header activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects projects={projects} loading={loading} error={error} />
        <Contact onOpenAdmin={onOpenAdmin} />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from Supabase on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              projects={projects}
              loading={loading}
              error={error}
              onOpenAdmin={() => setShowAdmin(true)}
            />
          }
        />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>

      {showAdmin && (
        <AdminPanel
          projects={projects}
          onProjectsChange={fetchProjects}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </Router>
  );
};

export default App;
