// frontend/app/admin/meals/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff,
  FiX, FiUpload, FiSearch, FiTag,
} from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/lib/api";

const CATEGORIES = ["Starters", "Main Course", "Seafood", "Desserts", "Drinks"];
const TAGS_LIST  = ["Spicy", "Vegan", "Gluten-Free"];
const TAG_COLOR: Record<string, string> = {
  "Spicy": "#e87070", "Vegan": "#7dd87d", "Gluten-Free": "#e8c84a",
};

interface Meal {
  _id:            string;
  name:           string;
  description:    string;
  price:          number;
  promotionPrice: number | null;
  isPromotion:    boolean;
  category:       string;
  image:          string;
  tags:           string[];
  isVisible:      boolean;
}

const emptyForm = {
  name: "", description: "", price: "", promotionPrice: "",
  isPromotion: false, category: "Starters", tags: [] as string[], isVisible: true,
};

export default function AdminMealsPage() {
  const [meals,        setMeals]        = useState<Meal[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [modal,        setModal]        = useState<"add" | "edit" | null>(null);
  const [editMeal,     setEditMeal]     = useState<Meal | null>(null);
  const [form,         setForm]         = useState(emptyForm);
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState("");
  const [filterCat,    setFilterCat]    = useState("All");
  const [search,       setSearch]       = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchMeals = async () => {
    const r = await api.get("/api/meals?all=true");
    setMeals(r.data);
    setLoading(false);
  };

  useEffect(() => { fetchMeals(); }, []);

  const filtered = meals
    .filter(m => filterCat === "All" || m.category === filterCat)
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setForm(emptyForm); setImageFile(null); setImagePreview(""); setError(""); setEditMeal(null);
    setModal("add");
  };
  const openEdit = (meal: Meal) => {
    setForm({
      name: meal.name, description: meal.description,
      price: String(meal.price), promotionPrice: String(meal.promotionPrice || ""),
      isPromotion: meal.isPromotion, category: meal.category,
      tags: meal.tags, isVisible: meal.isVisible,
    });
    setImagePreview(meal.image); setImageFile(null); setError(""); setEditMeal(meal); setModal("edit");
  };
  const closeModal = () => { setModal(null); setEditMeal(null); setError(""); };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const toggleTag = (tag: string) =>
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }));

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) { setError("Name, price and category are required"); return; }
    if (modal === "add" && !imageFile) { setError("Please upload an image"); return; }
    setSaving(true); setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name); fd.append("description", form.description);
      fd.append("price", form.price); fd.append("category", form.category);
      fd.append("isPromotion", String(form.isPromotion)); fd.append("isVisible", String(form.isVisible));
      fd.append("tags", form.tags.join(","));
      if (form.promotionPrice) fd.append("promotionPrice", form.promotionPrice);
      if (imageFile) fd.append("image", imageFile);
      const headers = { "Content-Type": "multipart/form-data" };
      if (modal === "add") await api.post("/api/meals", fd, { headers });
      else if (editMeal) await api.put(`/api/meals/${editMeal._id}`, fd, { headers });
      await fetchMeals(); closeModal();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this meal permanently?")) return;
    await api.delete(`/api/meals/${id}`);
    setMeals(prev => prev.filter(m => m._id !== id));
  };

  const toggleVisible = async (meal: Meal) => {
    const fd = new FormData();
    fd.append("isVisible", String(!meal.isVisible));
    await api.put(`/api/meals/${meal._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    setMeals(prev => prev.map(m => m._id === meal._id ? { ...m, isVisible: !m.isVisible } : m));
  };

  /* ── shared input style ── */
  const IS: React.CSSProperties = {
    background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.82)", fontFamily: "'Tenor Sans', sans-serif",
    fontSize: "0.78rem", outline: "none", width: "100%",
    padding: "0.72rem 0.9rem", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <AdminLayout title="Meals">
      <style>{`
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .skeleton { background: linear-gradient(90deg,#111 25%,#181818 50%,#111 75%); background-size:400px 100%; animation:shimmer 1.4s infinite; }
        .meal-row:hover td { background: rgba(212,175,55,0.018) !important; }
        .inp:focus { border-color: rgba(212,175,55,0.38) !important; box-shadow: 0 0 0 3px rgba(212,175,55,0.05) !important; }
        .action-btn { transition: all 0.15s; }
        .action-btn:hover { transform: scale(1.15); }
      `}</style>

      {/* ── HEADER ── */}
      <div className="flex items-end justify-between mb-10 pb-7" style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}>
        <div>
          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.55em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", marginBottom: "7px" }}>
            Manage
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "0.06em", color: "#f0ece4", lineHeight: 1 }}>
            Meals
          </h1>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2.5 px-6 py-3 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #C9A227, #f0cc5a)", fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.32em", color: "#060606", fontWeight: 700, textTransform: "uppercase", boxShadow: "0 6px 24px rgba(212,175,55,0.22)" }}
        >
          <FiPlus size={13} /> New Meal
        </button>
      </div>

      {/* ── CONTROLS ── */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Search */}
        <div className="relative">
          <FiSearch size={11} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(212,175,55,0.3)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            className="inp outline-none"
            style={{ ...IS, paddingLeft: "32px", width: "180px", fontSize: "0.72rem" }}
            onFocus={e => { e.target.style.borderColor = "rgba(212,175,55,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.05)"; }}
            onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Filters */}
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.24em", padding: "0.4rem 0.9rem", textTransform: "uppercase", transition: "all 0.18s",
              background: filterCat === cat ? "linear-gradient(135deg, #C9A227, #f0cc5a)" : "transparent",
              color:      filterCat === cat ? "#060606" : "rgba(255,255,255,0.3)",
              border:     filterCat === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.07)",
              boxShadow:  filterCat === cat ? "0 3px 12px rgba(212,175,55,0.18)" : "none",
            }}
          >{cat}</button>
        ))}

        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.18)", marginLeft: "auto", textTransform: "uppercase" }}>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── TABLE ── */}
      {loading ? (
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-[62px]" style={{ border: "1px solid rgba(255,255,255,0.03)" }} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.09)" }}>
                {["", "Meal", "Category", "Price", "Tags", "Status", ""].map((h, i) => (
                  <th key={i} className="text-left pb-3.5 px-3"
                    style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.43rem", letterSpacing: "0.38em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((meal, i) => (
                  <motion.tr key={meal._id} className="meal-row"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    {/* Thumb */}
                    <td className="py-3.5 px-3 w-12">
                      <div className="w-10 h-10 overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="py-3.5 px-3 max-w-[180px]">
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#f0ece4", letterSpacing: "0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {meal.name}
                      </p>
                      {meal.description && (
                        <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.45rem", color: "rgba(255,255,255,0.2)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {meal.description}
                        </p>
                      )}
                    </td>
                    {/* Category */}
                    <td className="py-3.5 px-3">
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                        {meal.category}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {meal.isPromotion && meal.promotionPrice ? (
                        <div>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#D4AF37", lineHeight: 1 }}>
                            {meal.promotionPrice.toLocaleString()} DA
                          </p>
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", textDecoration: "line-through", marginTop: "1px" }}>
                            {meal.price.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#D4AF37" }}>
                          {meal.price.toLocaleString()} DA
                        </p>
                      )}
                    </td>
                    {/* Tags */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {meal.tags.map(t => (
                          <span key={t} className="px-1.5 py-0.5" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.4rem", letterSpacing: "0.1em", color: TAG_COLOR[t] || "#D4AF37", background: `${TAG_COLOR[t] || "#D4AF37"}10`, border: `1px solid ${TAG_COLOR[t] || "#D4AF37"}22` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 w-fit px-2 py-1"
                        style={{
                          border: `1px solid ${meal.isVisible ? "rgba(125,216,125,0.2)" : "rgba(255,255,255,0.06)"}`,
                          background: meal.isVisible ? "rgba(125,216,125,0.07)" : "rgba(255,255,255,0.02)",
                        }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: meal.isVisible ? "#7dd87d" : "rgba(255,255,255,0.2)" }} />
                        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.42rem", letterSpacing: "0.2em", textTransform: "uppercase", color: meal.isVisible ? "#7dd87d" : "rgba(255,255,255,0.22)" }}>
                          {meal.isVisible ? "Live" : "Off"}
                        </span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => toggleVisible(meal)} className="action-btn w-7 h-7 flex items-center justify-center"
                          style={{ border: "1px solid rgba(255,255,255,0.06)", color: meal.isVisible ? "rgba(255,255,255,0.28)" : "rgba(125,216,125,0.5)" }}>
                          {meal.isVisible ? <FiEyeOff size={11} /> : <FiEye size={11} />}
                        </button>
                        <button onClick={() => openEdit(meal)} className="action-btn w-7 h-7 flex items-center justify-center"
                          style={{ border: "1px solid rgba(212,175,55,0.12)", color: "rgba(212,175,55,0.45)" }}>
                          <FiEdit2 size={11} />
                        </button>
                        <button onClick={() => handleDelete(meal._id)} className="action-btn w-7 h-7 flex items-center justify-center"
                          style={{ border: "1px solid rgba(232,112,112,0.12)", color: "rgba(232,112,112,0.45)" }}>
                          <FiTrash2 size={11} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.12)" }}>
                <FiTag size={16} style={{ color: "rgba(212,175,55,0.3)" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(255,255,255,0.18)", fontSize: "1.1rem", fontStyle: "italic" }}>
                {search ? `No results for "${search}"` : "No meals here yet"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════ MODAL ══ */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(4px)" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 14 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{ scale: 0.95,    opacity: 0, y: 14 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl max-h-[92vh] overflow-y-auto"
              style={{ background: "#0F0F0F", border: "1px solid rgba(212,175,55,0.16)", boxShadow: "0 40px 100px rgba(0,0,0,0.75)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 py-5 sticky top-0 z-10"
                style={{ background: "#0F0F0F", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.43rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.38)", textTransform: "uppercase", marginBottom: "4px" }}>
                    {modal === "add" ? "New Entry" : "Editing"}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.25rem", color: "#D4AF37", letterSpacing: "0.07em" }}>
                    {modal === "add" ? "Add Meal" : editMeal?.name}
                  </p>
                </div>
                <button onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <FiX size={13} />
                </button>
              </div>

              <div className="p-7 flex flex-col gap-6">

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3"
                      style={{ background: "rgba(232,112,112,0.06)", border: "1px solid rgba(232,112,112,0.18)" }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#e87070" }} />
                      <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.06em", color: "rgba(232,120,120,0.9)" }}>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image upload */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Photo</p>
                  <div className="relative overflow-hidden cursor-pointer group"
                    style={{ height: "165px", border: "1px dashed rgba(212,175,55,0.16)", background: "#0A0A0A", transition: "border-color 0.2s" }}
                    onClick={() => fileRef.current?.click()}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.16)")}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Change</p>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.18)" }}>
                          <FiUpload size={15} style={{ color: "rgba(212,175,55,0.4)" }} />
                        </div>
                        <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.46rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
                          Click to upload
                        </p>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Meal Name</p>
                  <input className="inp" style={IS} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => { e.target.style.borderColor = "rgba(212,175,55,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.05)"; }}
                    onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; }} />
                </div>

                {/* Description */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Description</p>
                  <textarea rows={3} className="inp" style={{ ...IS, resize: "none" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    onFocus={e => { (e.target as any).style.borderColor = "rgba(212,175,55,0.38)"; (e.target as any).style.boxShadow = "0 0 0 3px rgba(212,175,55,0.05)"; }}
                    onBlur={e  => { (e.target as any).style.borderColor = "rgba(255,255,255,0.07)"; (e.target as any).style.boxShadow = "none"; }} />
                </div>

                {/* Category */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Category</p>
                  <select className="inp" style={IS} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
                  </select>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Price (DA)",       key: "price" as const },
                    { label: "Promo Price (DA)",  key: "promotionPrice" as const },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>{label}</p>
                      <input type="number" className="inp" style={IS} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        onFocus={e => { e.target.style.borderColor = "rgba(212,175,55,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.05)"; }}
                        onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; }} />
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.44rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Dietary Tags</p>
                  <div className="flex gap-2">
                    {TAGS_LIST.map(tag => (
                      <button key={tag} onClick={() => toggleTag(tag)}
                        style={{
                          fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", padding: "0.4rem 1rem", transition: "all 0.15s",
                          background: form.tags.includes(tag) ? `${TAG_COLOR[tag]}12` : "transparent",
                          color:      form.tags.includes(tag) ? TAG_COLOR[tag] : "rgba(255,255,255,0.28)",
                          border:     form.tags.includes(tag) ? `1px solid ${TAG_COLOR[tag]}38` : "1px solid rgba(255,255,255,0.07)",
                        }}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-8 pt-1">
                  {([["Is Promotion", "isPromotion"], ["Visible on site", "isVisible"]] as [string, "isPromotion" | "isVisible"][]).map(([label, key]) => (
                    <div key={key} className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setForm(f => ({ ...f, [key]: !f[key] }))}>
                      <div className="relative flex-shrink-0" style={{ width: "34px", height: "18px" }}>
                        <div className="w-full h-full rounded-full transition-all duration-200"
                          style={{ background: form[key] ? "#D4AF37" : "rgba(255,255,255,0.08)" }} />
                        <div className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all duration-200"
                          style={{ left: form[key] ? "17px" : "2px" }} />
                      </div>
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: form[key] ? "rgba(212,175,55,0.65)" : "rgba(255,255,255,0.28)", transition: "color 0.2s" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px" style={{ background: "rgba(212,175,55,0.07)" }} />

                {/* Submit */}
                <button onClick={handleSave} disabled={saving}
                  className="py-3.5 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: saving ? "rgba(212,175,55,0.25)" : "linear-gradient(135deg, #C9A227, #f0cc5a)", fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.35em", color: "#060606", fontWeight: 700, textTransform: "uppercase", boxShadow: saving ? "none" : "0 4px 18px rgba(212,175,55,0.2)" }}>
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border border-black/25 border-t-black/65 rounded-full animate-spin" />
                      Saving
                    </span>
                  ) : modal === "add" ? "Create Meal" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}