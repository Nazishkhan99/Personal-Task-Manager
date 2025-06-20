import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js"; // 👈 import this
import "./TaskModal.css";

export default function TaskModal({ task, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [category, setCategory] = useState(task.category || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const pdfRef = useRef(); // 👈 to grab content

  const handleSave = () => {
    onSave({ title, category, priority, dueDate });
    setIsEditing(false);
  };

  // 🧾 Function to download PDF of this task
  const handleDownload = () => {
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${title.replace(/\s+/g, "_")}_task.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(pdfRef.current)
      .save();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 📥 Download & Save/Edit Button */}
        <div className="modal-top-right">
          <button className="edit-btn-top" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <button className="download-btn" onClick={handleDownload}>📥</button>
        </div>

        <div className="modal-header">
          <h2>Task Details</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* 🔖 Task Details section to be downloaded */}
        <div
  className="modal-body"
  ref={pdfRef}
  style={{
    backgroundColor: "#1e1e1e",  // light-black/gray background
    color: "#f5f5f5",             // white-ish text color for contrast
    padding: "1rem",
    borderRadius: "8px"
  }}
>

          <label className="modal-label">Title:</label>
          {isEditing ? (
            <input className="modal-field editable" value={title} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <span className="modal-field">{title}</span>
          )}

          <label className="modal-label">Your Tasks:</label>
          {isEditing ? (
            <textarea className="modal-field editable" value={category} onChange={(e) => setCategory(e.target.value)} />
          ) : (
            <span className="modal-field">{category || "No description."}</span>
          )}

          <label className="modal-label">Priority:</label>
          {isEditing ? (
            <select className="modal-field editable" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          ) : (
            <span className="modal-field">{priority}</span>
          )}

          <label className="modal-label">Due Date:</label>
          {isEditing ? (
            <input
              className="modal-field editable"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          ) : (
            <span className="modal-field">{dueDate || "No due date"}</span>
          )}
        </div>
      </div>
    </div>
  );
}
