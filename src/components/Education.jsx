import React from "react";
import { GraduationCap, MapPin, Award, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      institution: "Eskişehir Technical University",
      degree: "Bachelor of Science in Computer Engineering",
      gpa: "GPA: 3.14 / 4.00",
      location: "Eskişehir, Turkey",
      duration: "Sep 2021 - Jun 2025",
      color: "cyan",
      highlights: [
        "Specialized in Software Engineering and Software Development",
        "Completed projects in Machine Learning and Web Development",
      ],
    },
    {
      institution: "Egefen Anatolian High School",
      degree: "High School Diploma",
      gpa: "Valedictorian",
      location: "Aydın, Turkey",
      duration: "Sep 2017 - Jul 2021",
      color: "fuchsia",
      highlights: [],
    },
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">Education</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
          <p className="text-gray-400 mt-4">// Academic Background</p>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="cyber-card p-8 rounded-lg relative group"
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                style={{
                  background: `radial-gradient(circle at center, ${
                    edu.color === "cyan"
                      ? "rgba(0, 245, 255, 0.1)"
                      : "rgba(255, 0, 255, 0.1)"
                  } 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 border flex items-center justify-center shrink-0`}
                      style={{
                        borderColor:
                          edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                        background:
                          edu.color === "cyan"
                            ? "rgba(0, 245, 255, 0.1)"
                            : "rgba(255, 0, 255, 0.1)",
                      }}
                    >
                      <GraduationCap
                        className="w-7 h-7"
                        style={{
                          color: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {edu.institution}
                      </h3>
                      <p
                        className="text-lg font-medium mt-1"
                        style={{
                          color: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                        }}
                      >
                        {edu.degree}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {edu.gpa}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div
                    className="px-4 py-2 border font-mono text-sm flex items-center gap-2 shrink-0"
                    style={{
                      borderColor:
                        edu.color === "cyan" ? "#00f5ff40" : "#ff00ff40",
                      color: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    {edu.duration}
                  </div>
                </div>

                {/* Highlights */}
                <div className="pl-18 md:pl-[4.5rem]">
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span
                          className="mt-1"
                          style={{
                            color: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                          }}
                        >
                          ▹
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Corner */}
                <div
                  className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-30"
                  style={{
                    borderColor: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-30"
                  style={{
                    borderColor: edu.color === "cyan" ? "#00f5ff" : "#ff00ff",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
