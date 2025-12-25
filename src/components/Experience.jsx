import React from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Software Development Intern",
      company: "SİSTAŞ SAYISAL İLETİŞİM SAN. VE TİC. A.Ş.",
      location: "Istanbul, Turkey",
      duration: "Jan 2025 - Feb 2025",
      color: "cyan",
      description: [
        "Worked on an auction-app project using Java Spring Boot, Angular, and JHipster microservices",
        "Designed and implemented multi-layered architecture for robust application development",
        "Integrated MySQL for database management and optimization",
        "Utilized GitHub for version control in a collaborative development environment",
        "Contributed to optimizing backend logic and ensuring seamless frontend-backend communication",
        "Gained practical experience in microservices ecosystem development",
      ],
      tags: ["Java", "Spring Boot", "Angular", "MySQL", "Microservices"],
    },
    {
      title: "Software Engineering Intern",
      company: "TEI - TUSAŞ Engine Industries",
      location: "Eskişehir, Turkey",
      duration: "Aug 2024 - Sep 2024",
      color: "fuchsia",
      description: [
        "Developed RESTful APIs using .NET Core and C#",
        "Managed database operations with Entity Framework Core",
        "Increased code quality and reliability through Test-Driven Development (TDD)",
        "Wrote comprehensive unit and integration tests to ensure application stability",
        "Documented and tested APIs using Swagger UI",
        "Simplified model transformations with AutoMapper",
        "Organized code structure using the Repository Pattern",
        "Used Git & GitHub for version control and team collaboration",
      ],
      tags: [".NET Core", "C#", "EF Core", "TDD", "Swagger", "REST API"],
    },
    {
      title: "Core Team Member",
      company: "Google Developer Student Clubs (GDSC)",
      location: "Eskişehir, Turkey",
      duration: "Sep 2023 - Jun 2024",
      color: "purple",
      description: [
        "Planned and executed various technical workshops and events",
        "Collaborated effectively with team members from diverse disciplines",
        "Enhanced leadership, time management, and strategic thinking skills",
        "Developed proactive communication and problem-solving abilities",
      ],
      tags: ["Leadership", "Event Planning", "Community", "Workshops"],
    },
  ];

  return (
    <section id="experience" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">Experience</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
          <p className="text-gray-400 mt-4">// Professional Journey</p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="cyber-timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline Dot */}
                <div
                  className={`cyber-timeline-dot border-${exp.color}-400`}
                  style={{
                    top: "8px",
                    borderColor:
                      exp.color === "cyan"
                        ? "#00f5ff"
                        : exp.color === "fuchsia"
                        ? "#ff00ff"
                        : "#8b5cf6",
                    boxShadow: `0 0 10px ${
                      exp.color === "cyan"
                        ? "#00f5ff"
                        : exp.color === "fuchsia"
                        ? "#ff00ff"
                        : "#8b5cf6"
                    }`,
                  }}
                />

                {/* Card */}
                <div
                  className={`cyber-card p-6 rounded-lg hover:border-${exp.color}-400/50 transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Briefcase
                          className={`w-5 h-5 text-${exp.color}-400`}
                          style={{
                            color:
                              exp.color === "cyan"
                                ? "#00f5ff"
                                : exp.color === "fuchsia"
                                ? "#ff00ff"
                                : "#8b5cf6",
                          }}
                        />
                        {exp.title}
                      </h3>
                      <p
                        className={`text-lg font-medium mt-1`}
                        style={{
                          color:
                            exp.color === "cyan"
                              ? "#00f5ff"
                              : exp.color === "fuchsia"
                              ? "#ff00ff"
                              : "#8b5cf6",
                        }}
                      >
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-2 border bg-opacity-10 font-mono text-sm flex items-center gap-2`}
                      style={{
                        borderColor:
                          exp.color === "cyan"
                            ? "#00f5ff40"
                            : exp.color === "fuchsia"
                            ? "#ff00ff40"
                            : "#8b5cf640",
                        color:
                          exp.color === "cyan"
                            ? "#00f5ff"
                            : exp.color === "fuchsia"
                            ? "#ff00ff"
                            : "#8b5cf6",
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-cyan-500/20">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
