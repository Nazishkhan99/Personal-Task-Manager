import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import html2pdf from 'html2pdf.js';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import './TaskManager.css';

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [filter, setFilter] = useState('all');
  const taskRef = useRef();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Core handlers
  const addTask = (newTask) => setTasks((prev) => [...prev, { id: uuidv4(), ...newTask, completed: false }]);
  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const editTask = (id, updated) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  // PDF download options
  const pdfOptions = {
    margin: 0.5,
    filename: `Tasks_${filter}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  const downloadPDF = () => {
    html2pdf().set(pdfOptions).from(taskRef.current).save();
  };

  return (
    <div className="task-manager">
      <h1 className="task-manager-title">📝 Personal Task Manager</h1>
      <TaskForm addTask={addTask} />
      <FilterBar setFilter={setFilter} />

      <div className="task-actions">
        <button onClick={downloadPDF}>📄 Download PDF</button>
      </div>

      {/* PDF preview section */}
      <div ref={taskRef} className="task-pdf">
         <h3 className='Task'>Task Lists</h3>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}
