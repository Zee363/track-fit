import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeroSection from "./components/Hero";
import Header from "./components/Header";
import WorkoutPage from "./pages/Workout";
import Exercise from "./pages/Exercise";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/workout" element={<WorkoutPage />}></Route>
        <Route path="/exercise" element={<Exercise />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
