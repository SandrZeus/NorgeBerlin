import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill"; // Import Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const CreateNewsForm = ({ refreshPosts }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title_en: "",
    content_en: "",
    title_de: "",
    content_de: "",
    createdAt: "",
    files: [],
    showFirstImageAtBottom: false,
    gallery_layout: "grid", // Default layout
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Function to create a slug from a given title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with -
      .replace(/^-|-$/g, ''); // Remove leading/trailing -
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  return (
    <div>
      <h2>{t("createNews")}</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (
            !formData.title_en ||
            !formData.content_en ||
            !formData.title_de ||
            !formData.content_de
          ) {
            alert(t("pleaseFillAllFields"));
            return;
          }

          setLoading(true);
          const submissionData = new FormData();

          // Generate slugs
          const slug_en = createSlug(formData.title_en);
          const slug_de = createSlug(formData.title_de);

          Object.entries(formData).forEach(([key, value]) => {
            if (key === "files") {
              value.forEach((file) => submissionData.append("files", file));
            } else if (key === "showFirstImageAtBottom") {
              submissionData.append("show_first_image", value ? "true" : "false"); // Ensure it's sent as a string
            } else {
              submissionData.append(key, value);
            }
          });

          // Append slugs to submission data
          submissionData.append('slug_en', slug_en);
          submissionData.append('slug_de', slug_de);

          try {
            const response = await fetch("http://localhost:5000/api/news", {
              method: "POST",
              body: submissionData,
            });

            if (response.ok) {
              alert(t("newsCreatedSuccess"));
              setFormData({
                title_en: "",
                content_en: "",
                title_de: "",
                content_de: "",
                createdAt: "",
                files: [],
                showFirstImageAtBottom: false,
                gallery_layout: "grid",
              });
              if (fileInputRef.current) fileInputRef.current.value = "";
              refreshPosts();
            } else {
              alert(t("errorCreatingNews"));
            }
          } catch (error) {
            console.error("Error:", error);
            alert(t("networkError"));
          } finally {
            setLoading(false);
          }
        }}
      >
        <label>{t("title")} (English)</label>
        <input
          type="text"
          name="title_en"
          value={formData.title_en}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title_en: e.target.value }))
          }
          placeholder={t("enterTitle")}
          required
        />

        <label>{t("content")} (English)</label>
        <ReactQuill
          name="content_en"
          value={formData.content_en}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content_en: value }))
          }
          placeholder={t("enterContent")}
          required
        />

        <label>{t("title")} (German)</label>
        <input
          type="text"
          name="title_de"
          value={formData.title_de}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title_de: e.target.value }))
          }
          placeholder={t("enterTitle")}
          required
        />

        <label>{t("content")} (German)</label>
        <ReactQuill
          name="content_de"
          value={formData.content_de}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content_de: value }))
          }
          placeholder={t("enterContent")}
          required
        />

        <label>{t("uploadFiles")}</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
        />
        {formData.files.length > 0 && (
          <ul>
            {formData.files.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </li>
            ))}
          </ul>
        )}

        <label>
          <input
            type="checkbox"
            checked={formData.showFirstImageAtBottom}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                showFirstImageAtBottom: e.target.checked,
              }))
            }
          />
          Don't show the first image
        </label>

        <label>Created at</label>
        <input
          type="datetime-local"
          name="createdAt"
          value={formData.createdAt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, createdAt: e.target.value }))
          }
        />

        <label>{t("galleryLayout")}</label>
        <select
          name="gallery_layout"
          value={formData.gallery_layout}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              gallery_layout: e.target.value,
            }))
          }
        >
          <option value="grid">{t("gridLayout")}</option>
          <option value="masonry">{t("masonryLayout")}</option>
          <option value="carousel">{t("carouselLayout")}</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? t("creating") : t("create")}
        </button>
      </form>
    </div>
  );
};

export default CreateNewsForm;
