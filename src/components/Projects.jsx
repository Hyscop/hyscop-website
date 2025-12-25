import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Folder,
  Star,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const Projects = ({ projects = [], loading = false, error = null }) => {
  const navigate = useNavigate();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">Projects</span>
            <span className="text-cyan-400"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto" />
          <p className="text-gray-400 mt-4">{"// Things I've Built"}</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading projects from database...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* No Projects State */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Folder className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400">
              No projects yet. Add some from the admin panel!
            </p>
          </div>
        )}

        {/* Featured Projects */}
        {!loading && !error && featuredProjects.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="cyber-card rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  {/* Project Image or Placeholder */}
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-fuchsia-900/20">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Folder className="w-16 h-16 text-cyan-400/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 text-xs font-mono">
                      FEATURED
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-cyan-500/20">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                          <span className="text-sm">Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span className="text-sm">Live Demo</span>
                        </a>
                      )}
                      <span className="flex items-center gap-1 text-cyan-400 text-sm ml-auto group-hover:translate-x-1 transition-transform">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {!loading && !error && otherProjects.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Folder className="w-5 h-5 text-cyan-400" />
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="cyber-card p-6 rounded-lg hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-10 h-10 text-cyan-400" />
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-fuchsia-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs text-gray-500 font-mono">
                        {tag}
                        {i < Math.min(project.tags.length, 3) - 1 && " •"}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
