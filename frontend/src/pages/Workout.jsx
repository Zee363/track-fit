import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/workout.css";


const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]); 
  const [loggedExercises, setLoggedExercises] = useState([]);

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
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const exercise = event.target.exercise.value;
    const sets = event.target.sets.value;
    const reps = event.target.reps.value;

      // Check if required fields are filled
  if (!exercise || !sets || !reps) {
    console.log("Please fill all fields.");
    return;
  }


    try {
      // Make a POST request to log the workout
      const response = await axios.post(
        "http://localhost:5001/api/exercises/add-log",
        {
          exercise,
          sets,
          reps,
        }
      );

      if (response.status === 201) {
        console.log(
          `Logged Workout: ${exercise.name}, Sets: ${sets}, Reps: ${reps} into the database.`
        );

        setLoggedExercises((prevExercises) => [
          ...prevExercises,
          { exercise, sets, reps },
        ]);
      } else {
        console.log("Failed to log workout.");
      }
    } catch (error) {
      console.error("Error logging workout:", error);
    }
}
  
  const Exercise = {
        fullBody: [
          { name: 'Burpees', sets: 3, reps: 10, duration: '1 minute', image: '/burpee.jpg' },
          { name: 'Mountain Climbers', sets: 3, reps: 20, duration: '1 minute', image: '/images/mountain-climbers.jpg' },
          { name: 'Squats', sets: 4, reps: 10, rest: '60 seconds', image: '/squat.jpg' },
          { name: 'Push-Ups', sets: 3, reps: 15, rest: '60 seconds', image: '/pushup.jpg' }
        ],
        
        upperBody: [
          { name: 'Push-Ups', sets: 3, reps: 15, rest: '60 seconds', image: '/pushup.jpg' },
          { name: 'Bench Press', sets: 4, reps: 10, rest: '90 seconds', image: '/bench press.jpg' },
          { name: 'Chest Fly', sets: 3, reps: 12, rest: '60 seconds', image: '/chest-fly.jpg' },
          { name: 'Overhead Shoulder Press', sets: 3, reps: 10, rest: '60 seconds', image: '/overhead-shoulder-press.jpg' },
          { name: 'Lateral Raise', sets: 3, reps: 12, rest: '60 seconds', image: '/lateral-raises.jpg' },
          { name: 'Bicep Curls', sets: 3, reps: 12, rest: '60 seconds', image: '/bicep-curls.jpg' },
          { name: 'Tricep Dips', sets: 3, reps: 12, rest: '60 seconds', image: '/tricep-dips.jpg' }
        ],
      
        lowerBody: [
          { name: 'Squats', sets: 4, reps: 10, rest: '60 seconds', image: '/squat.jpg' },
          { name: 'Lunges', sets: 3, reps: 12, rest: '60 seconds', image: '/lunges.jpg' },
          { name: 'Leg Press', sets: 3, reps: 10, rest: '60 seconds', image: '/leg-press.jpg' },
          { name: 'Deadlifts', sets: 3, reps: 8, rest: '90 seconds', image: '/deadlifts.jpg' },
          { name: 'Bent-Over Rows', sets: 3, reps: 12, rest: '60 seconds', image: '/bent-over-row.jpg' }
        ],
      
        back: [
          { name: 'Deadlifts', sets: 3, reps: 8, rest: '90 seconds', image: '/deadlifts.jpg' },
          { name: 'Bent-Over Rows', sets: 3, reps: 12, rest: '60 seconds', image: '/bent-over-row.jpg' },
          { name: 'Lat Pulldown', sets: 3, reps: 10, rest: '60 seconds', image: '/lat-pulldown.jpg' }
        ],
      
        cardio: [
          { name: 'Burpees', sets: 3, reps: 10, duration: '1 minute', image: '/burpee.jpg' },
          { name: 'Jump Rope', sets: 3, reps: 60, duration: '1 minute', image: '/jump-rope.jpg' },
          { name: 'Mountain Climbers', sets: 3, reps: 20, duration: '1 minute', image: '/mountain-climbers.jpg' }
        ],
      
        core: [
          { name: 'Planks', sets: 3, duration: '30-60 seconds', rest: '30 seconds', image: '/images/plank.jpg' },
          { name: 'Russian Twists', sets: 3, reps: 20, rest: '30 seconds', image: '/russian-twist.jpg'},
          { name: 'Leg Raises', sets: 3, reps: 12, rest: '30 seconds', image: '/leg-raise.jpg' }
        ]
  } 

  return (
    <div className="workout-page">
      <div className="exercise-selection">
        <h2>Select Your Exercises</h2>
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
                    <img src={exercise.image} alt={exercise.name} className="exercise-image" />
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

      <div className="log-workout">
        <h2>Log Your Workout</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="exercise">Select Exercise:</label>
          <select id="exercise" name="exercise">
          {Object.keys(exercises).map((category) => (
              exercises[category].map((exercise, index) => (
                <option key={index} value={exercise.name}>
                  {exercise.name}
              </option>
              ))
            ))}
          </select>
          <label htmlFor="sets">Sets:</label>
          <input type="number" id="sets" name="sets" />
          <label htmlFor="reps">Reps:</label>
          <input type="number" id="reps" name="reps" />
          <button type="submit">Log Workout</button>
        </form>
      </div>

      <div className="logged-workouts">
        <h2>Logged Workouts</h2>
        {loggedExercises.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {loggedExercises.map((log, index) => (
              <li key={index}>
                <h3>{log.exercise}</h3>
                <p style={{ textAlign: "center" }}>Sets: {log.sets}, Reps: {log.reps}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
