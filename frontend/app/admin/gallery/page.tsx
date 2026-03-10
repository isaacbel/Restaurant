// frontend/app/admin/gallery/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2, FiX, FiImage, FiVideo, FiFilm } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/lib/api";

const FILTER_CATS = ["All", "Dishes", "Ambiance", "Drinks", "Events"];
const UPLOAD_CATS = ["Dishes", "Ambiance", "Drinks", "Events"];

interface GalleryItem {
  _id:      string;
  src:      string;
  alt:      string;
  type:     "image" | "video";
  category: string;
}

export default function AdminGalleryPage() {
  const [items,     setItems]     = useState<GalleryItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [modal,     setModal]     = useState(false);
  const [file,      setFile]      = useState<File | null>(null);
  const [preview,   setPreview]   = useState("");
  const [alt,       setAlt]       = useState("");
  const [category,  setCategory]  = useState("Ambiance");
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [deleting,  setDeleting]  = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    const r = await api.get("/api/gallery");
    setItems(r.data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = filterCat === "All" ? items : items.filter(i => i.category === filterCat);
  const isVid = (f: File | null) => f?.type.startsWith("video") ?? false;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) { setError("Please select a file"); return; }
    setUploading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("alt", alt); fd.append("category", category);
      await api.post("/api/gallery", fd, { headers: { "Content-Type": "multipart/form-data" } });
      await fetchItems();
      setModal(false); setFile(null); setPreview(""); setAlt(""); setCategory("Ambiance");
    } catch (err: any) {
      setError(err.response?.data?.error || "Upload failed");
    } finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this item from gallery?")) return;
    setDeleting(id);
    await api.delete(`/api/gallery/${id}`).catch(() => {});
    setItems(prev => prev.filter(i => i._id !== id));
    setDeleting(null);
  };

  const openModal = () => { setModal(true); setError(""); setFile(null); setPreview(""); setAlt(""); };

  const IS: React.CSSProperties = {
    background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.82)", fontFamily: "'Tenor Sans', sans-serif",
    fontSize: "0.78rem", outline: "none", width: "100%",
    padding: "0.72rem 0.9rem", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const stats = [
    { label: "Total",  value: items.length,                          accent: "#D4AF37" },
    { label: "Photos", value: items.filter(i => i.type === "image").length,  accent: "#7dd87d" },
    { label: "Videos", value: items.filter(i => i.type === "video").length,  accent: "#e8c84a" },
  ];

  return (
    <AdminLayout title="Gallery">
      <style>{`
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .skeleton { background: linear-gradient(90deg,#111 25%,#181818 50%,#111 75%); background-size:400px 100%; animation:shimmer 1.4s infinite; }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover { border-color: rgba(212,175,55,0.22) !important; }
        .inp:focus { border-color: rgba(212,175,55,0.38) !important; box-shadow: 0 0 0 3px rgba(212,175,55,0.05) !important; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="flex items-end justify-between mb-10 pb-7" style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}>
        <div>
          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.55em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", marginBottom: "7px" }}>
            Manage
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "0.06em", color: "#f0ece4", lineHeight: 1 }}>
            Gallery
          </h1>
        </div>
        <button onClick={openModal}
          className="flex items-center gap-2.5 px-6 py-3 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #C9A227, #f0cc5a)", fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.32em", color: "#060606", fontWeight: 700, textTransform: "uppercase", boxShadow: "0 6px 24px rgba(212,175,55,0.22)" }}>
          <FiUpload size={13} /> Upload
        </button>
      </div>

      {/* ── MINI STATS ── */}
      <div className="flex gap-3 mb-8">
        {stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="px-5 py-3.5"
            style={{ background: `${s.accent}07`, border: `1px solid ${s.accent}14` }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", color: s.accent, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.42rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {FILTER_CATS.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.24em", padding: "0.4rem 0.9rem", textTransform: "uppercase", transition: "all 0.18s",
              background: filterCat === cat ? "linear-gradient(135deg, #C9A227, #f0cc5a)" : "transparent",
              color:      filterCat === cat ? "#060606" : "rgba(255,255,255,0.3)",
              border:     filterCat === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.07)",
              boxShadow:  filterCat === cat ? "0 3px 12px rgba(212,175,55,0.18)" : "none",
            }}>
            {cat}
            {filterCat === cat && cat !== "All" && (
              <span className="ml-1.5" style={{ opacity: 0.6 }}>
                ({items.filter(i => i.category === cat).length})
              </span>
            )}
          </button>
        ))}
        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.18)", marginLeft: "auto", alignSelf: "center", textTransform: "uppercase" }}>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── GRID ── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square" style={{ border: "1px solid rgba(255,255,255,0.03)" }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: deleting === item._id ? 0.4 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="gallery-item relative overflow-hidden group"
                style={{ aspectRatio: "1", border: "1px solid rgba(212,175,55,0.07)", transition: "border-color 0.25s" }}
              >
                {/* Media */}
                {item.type === "image" ? (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.src} className="w-full h-full object-cover" muted playsInline />
                )}

                {/* Hover overlay */}
                <div className="gallery-overlay absolute inset-0 opacity-0 transition-opacity duration-200 flex flex-col items-center justify-center gap-2"
                  style={{ background: "rgba(0,0,0,0.72)" }}>
                  <button onClick={() => handleDelete(item._id)}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-150 hover:scale-110"
                    style={{ background: "rgba(232,112,112,0.12)", border: "1px solid rgba(232,112,112,0.35)", color: "#e87070" }}>
                    <FiTrash2 size={14} />
                  </button>
                  {item.alt && (
                    <p className="px-2 text-center" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.42rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", maxWidth: "90%" }}>
                      {item.alt}
                    </p>
                  )}
                </div>

                {/* Type badge */}
                <div className="absolute top-2 left-2">
                  <span className="flex items-center gap-1 px-1.5 py-0.5"
                    style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.38rem", letterSpacing: "0.14em", color: item.type === "video" ? "rgba(232,200,74,0.8)" : "rgba(212,175,55,0.7)", textTransform: "uppercase" }}>
                    {item.type === "video" ? <FiVideo size={7} /> : <FiImage size={7} />}
                    {item.type}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-2 right-2">
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.38rem", letterSpacing: "0.14em", color: "rgba(212,175,55,0.5)", textTransform: "uppercase" }}>
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-12 h-12 flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
            <FiFilm size={18} style={{ color: "rgba(212,175,55,0.28)" }} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(255,255,255,0.18)", fontSize: "1.1rem", fontStyle: "italic" }}>
            No items in this category
          </p>
        </div>
      )}

      {/* ══════════════════════════════ UPLOAD MODAL ══ */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(4px)" }}
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 14 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{ scale: 0.95,    opacity: 0, y: 14 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
              style={{ background: "#0F0F0F", border: "1px solid rgba(212,175,55,0.16)", boxShadow: "0 40px 100px rgba(0,0,0,0.75)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.43rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", marginBottom: "4px" }}>
                    New Upload
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.25rem", color: "#D4AF37", letterSpacing: "0.07em" }}>
                    Add to Gallery
                  </p>
                </div>
                <button onClick={() => setModal(false)}
                  className="w-8 h-8 flex items-center justify-center transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <FiX size={13} />
                </button>
              </div>

              <div className="p-7 flex flex-col gap-5">

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3"
                      style={{ background: "rgba(232,112,112,0.06)", border: "1px solid rgba(232,112,112,0.18)" }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#e87070" }} />
                      <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.58rem", color: "rgba(232,120,120,0.9)" }}>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Drop zone */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>
                    File
                  </p>
                  <div className="relative overflow-hidden cursor-pointer group"
                    style={{ height: "185px", border: "1px dashed rgba(212,175,55,0.16)", background: "#0A0A0A", transition: "border-color 0.2s" }}
                    onClick={() => fileRef.current?.click()}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.16)")}
                  >
                    {preview ? (
                      <>
                        {isVid(file)
                          ? <video src={preview} className="w-full h-full object-cover" muted />
                          : <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        }
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Change</p>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.18)" }}>
                          <FiUpload size={15} style={{ color: "rgba(212,175,55,0.4)" }} />
                        </div>
                        <div className="text-center">
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
                            Click to select
                          </p>
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.4rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.12)", marginTop: "4px" }}>
                            JPG, PNG, MP4, MOV
                          </p>
                        </div>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Caption</p>
                  <input className="inp" style={IS} value={alt} onChange={e => setAlt(e.target.value)} placeholder="e.g. Grilled salmon platter"
                    onFocus={e => { e.target.style.borderColor = "rgba(212,175,55,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.05)"; }}
                    onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; }} />
                </div>

                {/* Category */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Category</p>
                  <select className="inp" style={IS} value={category} onChange={e => setCategory(e.target.value)}>
                    {UPLOAD_CATS.map(c => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
                  </select>
                </div>

                <div className="h-px" style={{ background: "rgba(212,175,55,0.07)" }} />

                {/* Upload button */}
                <button onClick={handleUpload} disabled={uploading}
                  className="py-3.5 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: uploading ? "rgba(212,175,55,0.25)" : "linear-gradient(135deg, #C9A227, #f0cc5a)", fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.35em", color: "#060606", fontWeight: 700, textTransform: "uppercase", boxShadow: uploading ? "none" : "0 4px 18px rgba(212,175,55,0.2)" }}>
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border border-black/25 border-t-black/65 rounded-full animate-spin" />
                      Uploading
                    </span>
                  ) : "Upload to Cloudinary"}
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}