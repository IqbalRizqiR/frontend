"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { api } from "@/app/_components/lib/api";
import EditorNew from "../../components/EditorNew";

type FormState = {
  title: string;
  short_body: string;
  slug: string;
  tags: string[];
  body: string;
  thumbnail: File | null;
  existingThumbnail: string | null;
  status: "draft" | "publish";
};

export default function EditPostForm() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [formData, setFormData] = useState<FormState>({
    title: "",
    short_body: "",
    slug: "",
    tags: [],
    body: "",
    thumbnail: null,
    existingThumbnail: null,
    status: "draft",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const availableTags = [
    "OSIS",
    "MPK",
    "Akademik",
    "Non-Akademik",
    "Lomba",
    "Workshop",
    "Seminar",
    "Ekstrakurikuler",
  ];

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetching(true);
        const response = await api.get(`/blog/${postId}`);
        const post = response.data.data;

        setFormData({
          title: post.title || "",
          short_body: post.short_body || "",
          slug: post.slug || "",
          tags: post.tags ? post.tags.split(",").map((tag: string) => tag.trim()) : [],
          body: post.body || "",
          thumbnail: null,
          existingThumbnail: post.thumbnail || null,
          status: post.is_published ? "publish" : "draft",
        });

        if (post.thumbnail) {
          setPreviewImage(post.thumbnail);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        alert("Gagal memuat data post");
        router.push("/admin/posts");
      } finally {
        setFetching(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, body: content }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert("File terlalu besar. Maks 2MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, thumbnail: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  async function uploadToCloudinary(file: File) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_* env vars.");
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", uploadPreset);

    const res = await fetch(url, { method: "POST", body: fd });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cloudinary upload failed: ${text}`);
    }
    const data = await res.json();
    return data.secure_url as string;
  }

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent | null, publishStatus: "draft" | "publish" = "draft") => {
    if (e) e.preventDefault();

    // Validate body content
    if (!formData.body || formData.body.trim() === "" || formData.body === "<p></p>") {
      alert("Konten post tidak boleh kosong!");
      return;
    }

    setLoading(true);
    try {
      let thumbnailUrl: string | null = formData.existingThumbnail;
      
      // Only upload new thumbnail if file is selected
      if (formData.thumbnail) {
        thumbnailUrl = await uploadToCloudinary(formData.thumbnail);
      }

      const payload = {
        title: formData.title,
        body: formData.body,
        short_body: formData.short_body,
        thumbnail: thumbnailUrl,
        tags: formData.tags.join(","),
        slug: formData.slug,
        is_published: publishStatus === "publish",
        approval_status: "pending",
      };

      const res = await api.put(`/blog/${postId}`, JSON.stringify(payload));
      if (!res.status.toString().startsWith("2")) {
        const text = await res.data();
        throw new Error(`Update failed: ${text.message}`);
      }

      alert("Post berhasil diupdate!");
      router.push("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate post. Cek console untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e, "publish")} className="space-y-6">
          <div className="space-y-6 bg-white shadow p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h2>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Judul Post<span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Masukkan judul post..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Deskripsi<span className="text-red-500">*</span>
              </label>
              <textarea
                name="short_body"
                value={formData.short_body}
                onChange={handleInputChange}
                placeholder="Deskripsi singkat tentang post..."
                rows={3}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">Custom Slug</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="custom-url-slug"
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formData.tags.includes(tag)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">Thumbnail</label>
              <div className="flex items-start space-x-4">
                <div className="flex justify-center items-center bg-gray-100 rounded-lg w-48 h-48 overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <PhotoIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="inline-flex items-center bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm cursor-pointer"
                  >
                    Choose New File
                  </label>
                  {formData.thumbnail && (
                    <p className="mt-2 text-gray-500 text-sm">{formData.thumbnail.name}</p>
                  )}
                  {!formData.thumbnail && formData.existingThumbnail && (
                    <p className="mt-2 text-gray-500 text-sm">Using existing thumbnail</p>
                  )}
                  <p className="mt-2 text-gray-500 text-xs">
                    Recommended size: 1200x630px. Max file size: 2MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Konten<span className="text-red-500">*</span>
              </label>
              <EditorNew value={formData.body} onChange={handleEditorChange} />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="hover:bg-gray-50 px-6 py-2 border border-gray-300 rounded-lg text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(null, "draft")}
                disabled={loading}
                className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg text-white disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Save as Draft"}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Update & Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}