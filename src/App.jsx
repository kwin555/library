import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;
