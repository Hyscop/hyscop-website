import React from "react";
import { User, Code, Gamepad2, Music, Heart } from "lucide-react";

const About = () => {
  const highlights = [
    { icon: Code, label: "Full Stack Dev", color: "cyan" },
    { icon: Music, label: "Music Lover", color: "fuchsia" },
    { icon: Gamepad2, label: "Gamer", color: "purple" },
    { icon: Heart, label: "Cat Person", color: "pink" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">About</span>
            <span className="text-fuchsia-400">Me</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Card */}
            <div className="lg:col-span-2 cyber-card p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Who Am I?</h3>
                  <p className="text-gray-500 text-sm">
                    System.out.println("Hello World!");
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  As a{" "}
                  <span className="text-cyan-400 font-semibold">
                    Computer Engineer
                  </span>{" "}
                  graduate from{" "}
                  <span className="text-fuchsia-400">
                    Eskişehir Technical University
                  </span>
                  , I'm passionate about building scalable and efficient
                  software solutions that make a difference.
                </p>

                <p>
                  My technical toolkit includes{" "}
                  <span className="text-cyan-400">Java</span>,{" "}
                  <span className="text-fuchsia-400">Spring Boot</span>,{" "}
                  <span className="text-purple-400">.NET Core</span>,{" "}
                  <span className="text-cyan-400">React</span> and{" "}
                  <span className="text-yellow-400">MySQL</span>, complemented
                  by a solid understanding of{" "}
                  <span className="text-green-400">Microservices</span>{" "}
                  architecture and <span className="text-blue-400">Docker</span>{" "}
                  containerization.
                </p>

                <p>
                  As an{" "}
                  <span className="text-orange-400 font-semibold">
                    AWS Academy Graduate
                  </span>
                  , I bring cloud computing expertise that enhances my ability
                  to design and implement comprehensive solutions. Currently,
                  I'm exploring the exciting realms of AI and Machine Learning.
                </p>

                <p>
                  I thrive in collaborative environments where diverse
                  perspectives converge to solve complex challenges. Whether
                  working independently or as part of a team, I remain dedicated
                  to continuous learning and innovation.
                </p>
              </div>

              {/* Terminal Style Quote */}
              <div className="mt-8 p-4 bg-[#0a0a0f] border border-cyan-500/20 font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-500 ml-2">terminal</span>
                </div>
                <p className="text-gray-400">
                  <span className="text-cyan-400">$</span> echo $PHILOSOPHY
                </p>
                <p className="text-green-400 mt-1">
                  "Clean code, creative solutions, continuous growth."
                </p>
              </div>
            </div>

            {/* Side Info Cards */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="cyber-card p-6 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-cyan-400">//</span> Quick Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Education</span>
                    <span className="text-cyan-400 font-mono">
                      BSc. Computer Eng.
                    </span>
                  </div>
                  <div className="h-px bg-cyan-500/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">GPA</span>
                    <span className="text-fuchsia-400 font-mono">
                      3.14 / 4.00
                    </span>
                  </div>
                  <div className="h-px bg-cyan-500/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Location</span>
                    <span className="text-purple-400 font-mono">Turkey</span>
                  </div>
                  <div className="h-px bg-cyan-500/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="cyber-card p-6 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-fuchsia-400">//</span> Beyond Code
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className={`p-3 border border-${color}-500/30 bg-${color}-500/5 text-center hover:border-${color}-400 transition-colors`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 text-${color}-400`}
                      />
                      <span className="text-xs text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="cyber-card p-6 rounded-lg border-fuchsia-500/30">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">⚡</span> Fun Fact
                </h4>
                <p className="text-gray-400 text-sm">
                  When I'm not coding, you'll find me gaming, listening to
                  music, or hanging out with cats!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
