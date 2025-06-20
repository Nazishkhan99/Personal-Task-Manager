import React, { useState, useEffect } from 'react';
import './TaskForm.css';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(''); // "Enter your task here..." value
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';
      recog.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setCategory(text);
        setIsListening(false);
      };
      recog.onerror = (e) => {
        console.error('Speech error:', e.error);
        setIsListening(false);
      };
      setRecognition(recog);
    }
  }, []);

  const handleVoiceInput = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      alert('Your browser does not support voice input.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, category, priority, dueDate });
    setTitle('');
    setCategory('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="category-row">
        <input
          type="text"
          placeholder="Enter your task here..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-input"
        />
        <button
          type="button"
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceInput}
          title="Add task by voice"
        >
          🎤
        </button>
      </div>

      <div className="task-form-controls">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
