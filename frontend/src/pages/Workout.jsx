import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/workout.css";


const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]); 

  useEffect(() => {
    axios
    .get("http://localhost:5001/api/exercises")
    .then((response) => {
      setExercises(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching the exercises!", error);
    });
}, []);

const handleExerciseSelect = async (exerciseName) => {
const isSelected = selectedExercises.includes(exerciseName);
const updatedExercises = isSelected ? selectedExercises.filter((e) => e !== exerciseName) : [...selectedExercises, exerciseName]; setSelectedExercises(updatedExercises);


  setSelectedExercises(updatedExercises);
  console.log("Selected Exercises:", updatedExercises);
};

  return (
    <div className="workout-page">
      <div className="exercise-selection">
        <h2 style={{color: "white", marginLeft: "-22px"}}>Select Your Exercises</h2>
        <div className="exercise-grid">
        {Object.keys(exercises).map((category) => (
            <div key={category} className={`exercise-category ${ category === "fullBody" ? "full-width" : ""}`} >
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <div className="category-exercises">
                {exercises[category].map((exercise) => (
                  <div
                    key={exercise.name}
                    className={`exercise-block ${selectedExercises.includes(exercise.name) ? "selected" : ""}`}
                    onClick={() => handleExerciseSelect(exercise.name)}
                  >
                    <h4>{exercise.name}</h4>
                    <p>Sets: {exercise.sets}, Reps: {exercise.reps}</p>
                    {exercise.duration && <p>Duration: {exercise.duration}</p>}
                    {exercise.rest && <p>Rest: {exercise.rest}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default WorkoutPage;
