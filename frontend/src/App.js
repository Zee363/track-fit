import React from "react";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import HeroSection from "./components/Hero";
import WorkoutPage from "./pages/Workout";
import AddExercise from "./pages/AddExercise";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/workout" element={<WorkoutPage />}></Route>
        <Route path="/add" element={<AddExercise />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
