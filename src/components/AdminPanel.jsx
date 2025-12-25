import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  LogOut,
  Star,
  StarOff,
  Terminal,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle,
  Mail,
  KeyRound,
  ShieldCheck,
  Upload,
  Link,
} from "lucide-react";
import { projectsApi, authApi, storageApi } from "../lib/supabase";

const AdminPanel = ({ projects, onProjectsChange, onClose }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    images: [], // Gallery images
    tags: "",
    github: "",
    live: "",
    featured: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authApi.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setAuthLoading(false);
      }
    };
    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = authApi.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const { user } = await authApi.signIn(email, password);
      setUser(user);
      setMessage({ type: "success", text: "Logged in successfully!" });
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.signOut();
      setUser(null);
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      images: [],
      tags: "",
      github: "",
      live: "",
      featured: false,
    });
    setEditingProject(null);
    setIsCreating(false);
    setImageMode("url");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image must be less than 5MB" });
      return;
    }

    setUploadingImage(true);
    try {
      const publicUrl = await storageApi.uploadImage(file);
      setFormData({ ...formData, image: publicUrl });
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: `Upload failed: ${error.message}` });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Check file sizes
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: `${file.name} is larger than 5MB` });
        return;
      }
    }

    setUploadingGallery(true);
    try {
      const uploadPromises = files.map((file) => storageApi.uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedUrls],
      });
      setMessage({
        type: "success",
        text: `${files.length} image(s) uploaded to gallery!`,
      });
    } catch (error) {
      console.error("Gallery upload error:", error);
      setMessage({
        type: "error",
        text: `Gallery upload failed: ${error.message}`,
      });
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || "",
      images: Array.isArray(project.images) ? project.images : [],
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      github: project.github || "",
      live: project.live || "",
      featured: project.featured,
    });
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage({ type: "error", text: "Title and description are required" });
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    setLoading(true);
    try {
      if (isCreating) {
        await projectsApi.create({
          title: formData.title,
          description: formData.description,
          image: formData.image || null,
          images: formData.images.length > 0 ? formData.images : null,
          tags: tagsArray,
          github: formData.github || null,
          live: formData.live || null,
          featured: formData.featured,
        });
        setMessage({ type: "success", text: "Project created successfully!" });
      } else if (editingProject) {
        await projectsApi.update(editingProject.id, {
          title: formData.title,
          description: formData.description,
          image: formData.image || null,
          images: formData.images.length > 0 ? formData.images : null,
          tags: tagsArray,
          github: formData.github || null,
          live: formData.live || null,
          featured: formData.featured,
        });
        setMessage({ type: "success", text: "Project updated successfully!" });
      }

      await onProjectsChange();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage({
        type: "error",
        text: `Failed to save project: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setLoading(true);
      try {
        await projectsApi.delete(id);
        await onProjectsChange();
        setMessage({ type: "success", text: "Project deleted successfully!" });
      } catch (error) {
        console.error("Error deleting project:", error);
        setMessage({
          type: "error",
          text: `Failed to delete project: ${error.message}`,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFeatured = async (project) => {
    setLoading(true);
    try {
      await projectsApi.update(project.id, {
        ...project,
        featured: !project.featured,
      });
      await onProjectsChange();
    } catch (error) {
      console.error("Error updating project:", error);
      setMessage({
        type: "error",
        text: `Failed to update project: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-lg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-lg flex items-center justify-center p-4">
        <div className="cyber-card p-8 rounded-lg w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-gray-400 text-sm mt-2">
              Sign in with your credentials
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="cyber-input w-full rounded"
                    style={{ paddingLeft: "3rem" }}
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="cyber-input w-full rounded"
                    style={{ paddingLeft: "3rem" }}
                    required
                  />
                </div>
              </div>
              {authError && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {authError}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors rounded flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              Secured by Supabase Authentication
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Panel (authenticated)
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-lg overflow-auto">
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-cyan-400 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]">
            <div className="bg-[#12121a] border border-cyan-500/30 p-6 rounded-lg flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <span className="text-white">Processing...</span>
            </div>
          </div>
        )}

        {/* Message Toast */}
        {message.text && (
          <div
            className={`fixed top-4 right-4 z-[120] p-4 rounded-lg flex items-center gap-2 ${
              message.type === "success"
                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                : "bg-red-500/20 border border-red-500/50 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Auth Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs">
            Authenticated via Supabase
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800 pb-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              activeTab === "dashboard"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab("projects");
              resetForm();
            }}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              activeTab === "projects"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Projects
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Total Projects</span>
                <FolderKanban className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-bold text-white">{projects.length}</p>
            </div>
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Featured</span>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-3xl font-bold text-white">
                {projects.filter((p) => p.featured).length}
              </p>
            </div>
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Auth Status</span>
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xl font-bold text-green-400">Secured</p>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Your Projects</h2>
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {projects.length === 0 ? (
                  <div className="cyber-card p-8 rounded-lg text-center">
                    <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No projects yet</p>
                    <button
                      onClick={handleCreate}
                      className="mt-4 text-cyan-400 hover:text-cyan-300"
                    >
                      Create your first project
                    </button>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className={`cyber-card p-4 rounded-lg ${
                        editingProject?.id === project.id
                          ? "border-cyan-400"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {Array.isArray(project.tags) &&
                              project.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button
                            onClick={() => toggleFeatured(project)}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                            title={
                              project.featured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                            disabled={loading}
                          >
                            {project.featured ? (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                            title="Edit"
                            disabled={loading}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Edit Form */}
            {(isCreating || editingProject) && (
              <div className="cyber-card p-6 rounded-lg h-fit">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">
                    {isCreating ? "Create New Project" : "Edit Project"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="cyber-input w-full rounded"
                      placeholder="Project Title"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="cyber-input w-full rounded h-24 resize-none"
                      placeholder="Project description..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Project Image
                    </label>

                    {/* Toggle buttons for URL vs Upload */}
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setImageMode("url")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                          imageMode === "url"
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                            : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        <Link className="w-4 h-4" />
                        URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageMode("upload")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                          imageMode === "upload"
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                            : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>

                    {imageMode === "url" ? (
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="cyber-input w-full rounded"
                        placeholder="https://example.com/image.jpg"
                      />
                    ) : (
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-colors bg-gray-900/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploadingImage ? (
                              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                                <p className="text-sm text-gray-400">
                                  Click to upload image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG, GIF up to 5MB
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    )}

                    {/* Image preview */}
                    {formData.image && (
                      <div className="mt-3 relative">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded border border-gray-700"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, image: "" })
                          }
                          className="absolute top-2 right-2 p-1 bg-red-500/80 rounded hover:bg-red-500 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Gallery Images Section */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Gallery Images (shown on project detail page)
                    </label>
                    
                    {/* Gallery upload area */}
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors bg-gray-900/50">
                      <div className="flex flex-col items-center justify-center py-4">
                        {uploadingGallery ? (
                          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-gray-500 mb-1" />
                            <p className="text-sm text-gray-400">
                              Add gallery images
                            </p>
                            <p className="text-xs text-gray-500">
                              Select multiple files
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        disabled={uploadingGallery}
                      />
                    </label>

                    {/* Gallery thumbnails */}
                    {formData.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {formData.images.map((imgUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imgUrl}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-16 object-cover rounded border border-gray-700"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute -top-1 -right-1 p-0.5 bg-red-500/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.images.length} image(s) in gallery
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="cyber-input w-full rounded"
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        value={formData.github}
                        onChange={(e) =>
                          setFormData({ ...formData, github: e.target.value })
                        }
                        className="cyber-input w-full rounded"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Live URL
                      </label>
                      <input
                        type="text"
                        value={formData.live}
                        onChange={(e) =>
                          setFormData({ ...formData, live: e.target.value })
                        }
                        className="cyber-input w-full rounded"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 accent-cyan-400"
                    />
                    <label htmlFor="featured" className="text-gray-400">
                      Mark as Featured Project
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 py-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 py-3 bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {isCreating ? "Create Project" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder when not editing */}
            {!isCreating && !editingProject && (
              <div className="cyber-card p-8 rounded-lg flex flex-col items-center justify-center text-center min-h-[400px]">
                <FolderKanban className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400 mb-2">Select a project to edit</p>
                <p className="text-gray-500 text-sm">or create a new one</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
