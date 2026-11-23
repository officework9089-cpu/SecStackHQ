import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/_protected/projects")({
  head: () => ({ meta: [{ title: "Manage Projects — SecStackHQ" }] }),
  component: ProjectsAdminPage,
});

export interface ProjectRecord {
  id: string;
  created_at: string;
  title: string;
  category: string;
  client: string;
  summary: string;
  details: string;
  image: string;
  stack: string[];
  demo: string;
  github: string;
  status: "Published" | "Draft";
}

const BUCKET_NAME = "project-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const CATEGORY_OPTIONS = [
  "Web Development",
  "Full-Stack Web Application",
  "E-Commerce",
  "Cybersecurity",
  "Branding",
  "Marketing",
  "Publishing",
  "Automotive",
  "Navigation & Logistics",
  "Web Application & Non-Profit",
];

function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Add form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [demo, setDemo] = useState("");
  const [github, setGithub] = useState("");

  // Add form image file & preview state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Edit modal state
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Web Development");
  const [editClient, setEditClient] = useState("");
  const [editStatus, setEditStatus] = useState<"Published" | "Draft">("Published");
  const [editSummary, setEditSummary] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editStackInput, setEditStackInput] = useState("");
  const [editDemo, setEditDemo] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        toast.error(error.message || "Failed to load projects");
      } else {
        setProjects((data as ProjectRecord[]) ?? []);
      }
      setLoading(false);
    }

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  // Revoke object URLs on unmount or change to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    };
  }, [editImagePreview]);

  const validateImageFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP, or AVIF).");
      return false;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image must be smaller than 5 MB.");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      e.target.value = "";
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearSelectedImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      e.target.value = "";
      return;
    }

    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const clearEditSelectedImage = () => {
    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditImage("");
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const uploadCoverImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filePath = `covers/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const removeStorageImageIfOwned = async (imageUrl: string) => {
    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const idx = imageUrl?.indexOf(marker) ?? -1;
    if (idx !== -1) {
      const storagePath = decodeURIComponent(imageUrl.slice(idx + marker.length));
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    }
  };

  const openEditModal = (project: ProjectRecord) => {
    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImageFile(null);
    setEditImagePreview(null);

    setEditingProject(project);
    setEditTitle(project.title);
    setEditCategory(project.category);
    setEditClient(project.client);
    setEditStatus(project.status);
    setEditSummary(project.summary);
    setEditDetails(project.details);
    setEditStackInput((project.stack ?? []).join(", "));
    setEditDemo(project.demo);
    setEditGithub(project.github);
    setEditImage(project.image);
  };

  const closeEditModal = () => {
    if (savingEdit) return;
    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditingProject(null);
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadCoverImage(imageFile);
      }

      const stack = stackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const { data, error } = await supabase
        .from("projects")
        .insert({
          title: title.trim(),
          category,
          client: client.trim() || "Client",
          status,
          image: imageUrl,
          summary: summary.trim(),
          details: details.trim() || summary.trim(),
          stack,
          demo: demo.trim(),
          github: github.trim(),
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setProjects((prev) => [data as ProjectRecord, ...prev]);
      setTitle("");
      setClient("");
      setSummary("");
      setDetails("");
      setStackInput("");
      setDemo("");
      setGithub("");
      clearSelectedImage();
      toast.success("Project added to portfolio");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editTitle.trim()) return;

    setSavingEdit(true);

    try {
      let finalImageUrl = editImage;
      const previousImageUrl = editingProject.image;

      if (editImageFile) {
        finalImageUrl = await uploadCoverImage(editImageFile);
      }

      const stack = editStackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const updates = {
        title: editTitle.trim(),
        category: editCategory,
        client: editClient.trim() || "Client",
        status: editStatus,
        summary: editSummary.trim(),
        details: editDetails.trim() || editSummary.trim(),
        stack,
        demo: editDemo.trim(),
        github: editGithub.trim(),
        image: finalImageUrl,
      };

      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", editingProject.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Clean up old image if it was replaced or removed
      if (previousImageUrl && previousImageUrl !== finalImageUrl) {
        await removeStorageImageIfOwned(previousImageUrl);
      }

      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? (data as ProjectRecord) : p))
      );

      if (editImagePreview) URL.revokeObjectURL(editImagePreview);
      setEditImageFile(null);
      setEditImagePreview(null);
      setEditingProject(null);
      toast.success("Project updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update project");
    } finally {
      setSavingEdit(false);
    }
  };

  const toggleStatus = async (project: ProjectRecord) => {
    const nextStatus = project.status === "Published" ? "Draft" : "Published";

    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: nextStatus } : p))
    );

    const { error } = await supabase
      .from("projects")
      .update({ status: nextStatus })
      .eq("id", project.id);

    if (error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: project.status } : p))
      );
      toast.error(error.message || "Failed to update status");
      return;
    }

    toast.success(`Project set to ${nextStatus}`);
  };

  const handleDelete = async (project: ProjectRecord) => {
    const previous = projects;
    setProjects((prev) => prev.filter((p) => p.id !== project.id));

    const { error } = await supabase.from("projects").delete().eq("id", project.id);

    if (error) {
      setProjects(previous);
      toast.error(error.message || "Could not delete project");
      return;
    }

    await removeStorageImageIfOwned(project.image);
    toast.success("Project removed");
  };

  const activeEditPreview = editImagePreview || editImage || null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Add, update, or remove case studies displayed on your website.
        </p>
      </div>

      {/* Add Project Form */}
      <form
        onSubmit={handleAdd}
        className="grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title *"
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff] lg:col-span-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Published" | "Draft")}
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>

        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Client name (e.g. FinVault)"
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        />
        <input
          type="text"
          value={stackInput}
          onChange={(e) => setStackInput(e.target.value)}
          placeholder="Tech stack (comma-separated: React, Supabase)"
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff] sm:col-span-2 lg:col-span-3"
        />

        {/* Cover Image File Picker + Live Preview */}
        <div className="sm:col-span-2 lg:col-span-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            onChange={handleFileChange}
            className="hidden"
          />
          {imagePreview ? (
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-2.5">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="h-14 w-24 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{imageFile?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {imageFile ? `${(imageFile.size / 1024).toFixed(0)} KB` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearSelectedImage}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                title="Remove selected image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition hover:border-[#2f6bff] hover:text-foreground"
            >
              <ImagePlus className="h-4 w-4 text-[#2f6bff]" />
              <span>Upload cover image (PNG, JPG, WebP — max 5 MB)</span>
            </button>
          )}
        </div>

        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short card summary..."
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff] sm:col-span-2"
        />
        <input
          type="url"
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
          placeholder="Live demo URL (optional)"
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        />
        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="GitHub URL (optional)"
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        />

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Full case study details shown in modal..."
          rows={2}
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff] sm:col-span-2 lg:col-span-3"
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2f6bff] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f6bff]/90 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Project
            </>
          )}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No projects yet. Add your first case study above.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-10 w-16 shrink-0 rounded-md border border-border object-cover"
                        />
                      )}
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{project.client}</td>
                  <td className="px-6 py-4 text-muted-foreground">{project.category}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleStatus(project)}
                      title="Click to toggle Published / Draft"
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition ${
                        project.status === "Published"
                          ? "bg-[#2f6bff]/10 text-[#2f6bff]"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        className="rounded-md p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                        title="Edit project"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="rounded-md p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Project Modal */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && closeEditModal()}>
        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-2xl bg-card border border-border sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-['Sora'] text-xl font-bold">
              Edit Project
            </DialogTitle>
            <DialogDescription>
              Update project metadata, links, case study details, or cover image.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="grid gap-3 pt-2 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as "Published" | "Draft")}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Client</label>
              <input
                type="text"
                value={editClient}
                onChange={(e) => setEditClient(e.target.value)}
                placeholder="Client name"
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={editStackInput}
                onChange={(e) => setEditStackInput(e.target.value)}
                placeholder="React, Next.js, Supabase"
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Live Demo URL</label>
              <input
                type="url"
                value={editDemo}
                onChange={(e) => setEditDemo(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">GitHub URL</label>
              <input
                type="url"
                value={editGithub}
                onChange={(e) => setEditGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Cover Image</label>
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={handleEditFileChange}
                className="hidden"
              />
              {activeEditPreview ? (
                <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-2.5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={activeEditPreview}
                      alt="Cover preview"
                      className="h-14 w-24 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {editImageFile ? editImageFile.name : "Current cover image"}
                      </p>
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="text-xs font-medium text-[#2f6bff] hover:underline"
                      >
                        Replace image
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearEditSelectedImage}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => editFileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition hover:border-[#2f6bff] hover:text-foreground"
                >
                  <ImagePlus className="h-4 w-4 text-[#2f6bff]" />
                  <span>Upload cover image (PNG, JPG, WebP — max 5 MB)</span>
                </button>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Short Summary</label>
              <input
                type="text"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
                placeholder="Short card summary..."
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Case Study Details
              </label>
              <textarea
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
                placeholder="Full case study details shown in modal..."
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 sm:col-span-2">
              <button
                type="button"
                disabled={savingEdit}
                onClick={closeEditModal}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingEdit}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2f6bff] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f6bff]/90 disabled:opacity-60"
              >
                {savingEdit && <Loader2 className="h-4 w-4 animate-spin" />}
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}