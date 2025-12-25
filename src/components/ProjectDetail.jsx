import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { projectsApi } from "../lib/supabase";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getById(id);
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Get images array - combine thumbnail with gallery images
  const getImages = () => {
    if (!project) return [];
    const allImages = [];

    // Add thumbnail first if it exists
    if (project.image) {
      allImages.push(project.image);
    }

    // Add gallery images (avoiding duplicates)
    if (project.images && project.images.length > 0) {
      project.images.forEach((img) => {
        if (!allImages.includes(img)) {
          allImages.push(img);
        }
      });
    }

    return allImages;
  };

  const images = getImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] cyber-grid-bg flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] cyber-grid-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Project not found</h1>
          <button
            onClick={() => navigate("/")}
            className="cyber-button inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mb-12">
              {/* Main Image */}
              <div
                className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-cyan-500/30 cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#0a0a0f]/80 border border-cyan-500/50 rounded-full hover:bg-cyan-500/20 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-cyan-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#0a0a0f]/80 border border-cyan-500/50 rounded-full hover:bg-cyan-500/20 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-cyan-400" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0a0a0f]/80 border border-cyan-500/50 rounded-full text-sm text-gray-400">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-cyan-400 scale-110"
                          : "border-gray-700 hover:border-gray-500 opacity-60"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Info */}
          <div className="max-w-4xl mx-auto">
            {/* Title & Badge */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {project.title}
              </h1>
              {project.featured && (
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 mb-10">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button inline-flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-fuchsia-500 text-white font-semibold hover:bg-fuchsia-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
            </div>

            {/* Description */}
            <div className="cyber-card p-8 rounded-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="text-gray-500">{"// "}</span>About This Project
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                {project.description}
              </p>
            </div>

            {/* Metadata */}
            {project.created_at && (
              <div className="mt-8 flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  Added{" "}
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-cyan-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={images[currentImageIndex]}
            alt={`${project.title} full view`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
