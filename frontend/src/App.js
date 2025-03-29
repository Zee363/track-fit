import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeroSection from "./components/Hero";
import Header from "./components/Header";
import ExercisesPage from "./pages/Exercises";
import Workout from "./pages/Workout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/exercises" element={<ExercisesPage />}></Route>
        <Route path="/workout" element={<Workout />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
