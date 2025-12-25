import React from "react";
import {
  Code,
  Server,
  Database,
  Globe,
  Award,
  Cloud,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "cyan",
      skills: ["Java", "C#", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
      title: "Frameworks & Libraries",
      icon: Server,
      color: "fuchsia",
      skills: [
        "Spring Boot",
        ".NET Core",
        "React",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      title: "Tools & Technologies",
      icon: Database,
      color: "purple",
      skills: [
        "Git/GitHub",
        "MySQL",
        "PostgreSQL",
        "Docker",
        "REST APIs",
        "Microservices",
      ],
    },
  ];

  const languages = [
    {
      name: "Turkish",
      level: "Native",
      flag: "🇹🇷",
      percent: 100,
      color: "#ef4444",
    },
    {
      name: "English",
      level: "C1 Proficient",
      flag: "🇬🇧",
      percent: 85,
      color: "#00f5ff",
    },
    {
      name: "German",
      level: "A2 Elementary",
      flag: "🇩🇪",
      percent: 25,
      color: "#fbbf24",
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">Skills</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
          <p className="text-gray-400 mt-4">{"// Technical Arsenal"}</p>
        </div>

        {/* Technical Skills Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            const colorValue =
              category.color === "cyan"
                ? "#00f5ff"
                : category.color === "fuchsia"
                ? "#ff00ff"
                : "#8b5cf6";

            return (
              <div
                key={idx}
                className="cyber-card p-6 rounded-lg group hover:border-opacity-50 transition-all duration-300 relative"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: colorValue,
                      background: `${colorValue}15`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colorValue }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="skill-tag px-3 py-2 text-sm font-medium border rounded transition-all duration-300 hover:scale-105 cursor-default"
                      style={{
                        borderColor: `${colorValue}40`,
                        background: `${colorValue}10`,
                        color: colorValue,
                        "--skill-color": colorValue,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-30"
                  style={{ borderColor: colorValue }}
                />
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-30"
                  style={{ borderColor: colorValue }}
                />
              </div>
            );
          })}
        </div>

        {/* Languages & Certification Row */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="cyber-card p-6 rounded-lg relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center bg-cyan-400/10">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Languages</h3>
            </div>

            <div className="space-y-5">
              {languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-white font-medium">
                        {lang.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({lang.level})
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: lang.color }}
                    >
                      {lang.percent}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${lang.percent}%`,
                        background: lang.color,
                        boxShadow: `0 0 10px ${lang.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 opacity-30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 opacity-30" />
          </div>

          {/* Certification */}
          <div className="cyber-card p-6 rounded-lg relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-fuchsia-400 flex items-center justify-center bg-fuchsia-400/10">
                <Award className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Certification</h3>
            </div>

            <div className="border border-cyan-500/20 bg-cyan-500/5 p-6 rounded group hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 border-2 border-orange-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Cloud className="w-8 h-8 text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold">
                      AWS Academy Graduate
                    </h4>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-cyan-400 text-sm">
                    AWS Academy Cloud Foundations
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Amazon Web Services (AWS)
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Issued: Jan 2023</p>

                  <div className="mt-4 pt-4 border-t border-cyan-500/20">
                    <p className="text-gray-400 text-sm mb-3">
                      Completed Introduction to Cloud Computing course, learning
                      the fundamentals of cloud technology.
                    </p>
                    <a
                      href="https://credly.com/badges/b00c6153-2845-479f-b9a9-9e8fea9920d6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Credential
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-fuchsia-400 opacity-30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-fuchsia-400 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
