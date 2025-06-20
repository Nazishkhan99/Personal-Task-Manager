import React, { useState } from 'react';
import './TaskItem.css';

export default function TaskItem({ task, toggleTask, deleteTask, editTask, onOpen }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const saveEdit = () => {
    editTask(task.id, { title: editTitle });
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Main content */}
      <div className="task-item-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        {isEditing ? (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <span>{task.title}</span>
        )}

        <span className="task-meta">[{task.priority}]</span>
        {task.dueDate && <span className="task-meta">📅 {task.dueDate}</span>}
      </div>

      {/* Action buttons */}
      <div className="task-item-actions">
        <button onClick={onOpen} className="open-btn">Open</button>

        <button
          onClick={isEditing ? saveEdit : () => setIsEditing(true)}
          className={isEditing ? 'save-btn' : 'edit-btn'}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
