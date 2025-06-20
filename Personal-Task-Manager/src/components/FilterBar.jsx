import React from 'react';
import './FilterBar.css';

export default function FilterBar({ setFilter }) {
  return (
    <div className="filter-bar">
      {/* All, Completed and Pending */}
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
    </div>
  );
}
