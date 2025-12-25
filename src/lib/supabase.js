import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zsnqywuxmiglzkuuodcg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbnF5d3V4bWlnbHprdXVvZGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTkzNDYsImV4cCI6MjA4MjA5NTM0Nn0.34xTtAFfJxh_WqmQQhhOQM_VwiDJSp8j5swRK7-0S20";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth operations
export const authApi = {
  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Get current user
  async getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Project CRUD operations
export const projectsApi = {
  // Fetch all projects
  async getAll() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Fetch single project by ID
  async getById(id) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create a new project
  async create(project) {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title: project.title,
          description: project.description,
          image: project.image || null,
          images: project.images || [],
          tags: project.tags || [],
          github: project.github || null,
          live: project.live || null,
          featured: project.featured || false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing project
  async update(id, project) {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        description: project.description,
        image: project.image || null,
        images: project.images || [],
        tags: project.tags || [],
        github: project.github || null,
        live: project.live || null,
        featured: project.featured || false,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a project
  async delete(id) {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

// Storage operations for images
export const storageApi = {
  // Upload an image
  async uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    return publicUrl;
  },

  // Delete an image by URL
  async deleteImage(url) {
    try {
      // Extract path from URL
      const urlParts = url.split("/images/");
      if (urlParts.length < 2) return;

      const filePath = urlParts[1];
      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  },
};
