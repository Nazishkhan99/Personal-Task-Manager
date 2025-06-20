import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import html2pdf from 'html2pdf.js'; // 👈 add html2pdf
import './TaskList.css';

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  const [selectedTask, setSelectedTask] = useState(null); // Modal state

  // Save edited task
  const handleSaveTask = (updatedFields) => {
    if (selectedTask) {
      editTask(selectedTask.id, updatedFields); // Save updates
      setSelectedTask(null); // Close modal
    }
  };

  // ✅ Download a single task as PDF
  const downloadSingleTask = (task) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <h2>${task.title}</h2>
      ${task.category ? `<p><strong>Task:</strong> ${task.category}</p>` : ''}
      <p><strong>Priority:</strong> ${task.priority}</p>
      ${task.dueDate ? `<p><strong>Due Date:</strong> ${task.dueDate}</p>` : ''}
      <p><strong>Status:</strong> ${task.completed ? 'Completed' : 'Pending'}</p>
    `;

    html2pdf().set({
      filename: `${task.title.replace(/\s+/g, '_')}_Task.pdf`,
      margin: 0.5,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .from(container)
    .save();
  };

  return (
    <>
      {tasks.length === 0 && <p className="no-tasks">No tasks found.</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
            onOpen={() => setSelectedTask(task)}
          />
        ))}
      </ul>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
          onDownload={() => downloadSingleTask(selectedTask)} // pass to modal
        />
      )}
    </>
  );
}
