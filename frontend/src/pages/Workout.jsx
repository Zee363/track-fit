import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/workouts.css";


const Workout = () => {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
    rest: "",
  });


  const [isEditing, setIsEditing] = useState(false); 
  const [exerciseId, setExerciseId] = useState(null); 
  const [newExercises, setNewExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/new-exercises`);
      
      const fetchedExercises = response.data;

     setNewExercises(fetchedExercises);
    } catch (error) {
      console.log("Error fetching exercises", error);
      setNewExercises([]);
    }
  };
  
 
useEffect(() => {
  fetchExercises(); 
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExerciseData((prevExercise) => ({
      ...prevExercise,
      [name]: name === "sets" || name === "reps" ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isEditing && exerciseId) {
          // If editing, send PUT request
          const response= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/${exerciseId}`, exerciseData);
          console.log("Exercise updated successfully", response.data);

          setNewExercises((prevExercises) =>
            prevExercises.map((exercise) =>
              exercise._id === exerciseId ? response.data : exercise
            )
          );
        } else {
          // If adding, send POST request
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/add-exercise`, exerciseData);
        console.log("Exercise added successfully:",response.data);

        setNewExercises((prevNewExercises) => [
          ...prevNewExercises,
          exerciseData, 
        ]);
      }


     
      setExerciseData({ name: "", sets: 0, reps: 0, duration: "", rest: "" });
      setIsEditing(false);
      setExerciseId(null);
    } catch (error) {
      console.error("There was an error submitting the exercise", error);
    }
};

const handleDelete = async (id) => {
  console.log('Deleting exercise with ID:', id);  
  if (!id) {
    console.error("Exercise ID is undefined or invalid!");
    return; 
  }
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/${id}`);
    if (response.status === 200) {
      setNewExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise._id !== id)
      );
    } else {
      console.error("Error deleting exercise:", response.data);
    }
  } catch (error) {
    console.error("Error deleting exercise:", error);
  }
};


// Function to handle the editing state
const handleEdit = (exercise) => {
    setIsEditing(true);
    setExerciseId(exercise._id);
    setExerciseData({
      name: exercise.name || "",
      sets: exercise.sets || 0,
      reps: exercise.reps || 0,
      duration: exercise.duration || "",
      rest: exercise.rest || "",
    });
};


  return (
    <div className="exercise-section">
    <div className="add-exercise-form">
      <h2>{isEditing ? "Edit Workout" : "Add New Workout"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Workout Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={exerciseData.name}
          onChange={handleChange}
        />
        
        <label htmlFor="sets">Sets:</label>
        <input
          type="number"
          id="sets"
          name="sets"
          value={exerciseData.sets}
          onChange={handleChange}
        />
        
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={exerciseData.reps}
          onChange={handleChange}
        />

        <label htmlFor="duration">Duration (Optional):</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={exerciseData.duration}
          onChange={handleChange}
        />

        <label htmlFor="rest">Rest (Optional):</label>
        <input
          type="text"
          id="rest"
          name="rest"
          value={exerciseData.rest}
          onChange={handleChange}
        />

<button className="add-button" type="submit">{isEditing ? "Update Exercise" : "Add Exercise"}</button>
      </form>

      <div className="exercise-list">
      <h3>New Workout:</h3>
        {newExercises.length > 0 ? (
          newExercises.map((exercise, index) => (
            <div key={`${exercise._id}-${index}`} className="exercise-item">
              <p style={{ textAlign: "center" }}>{exercise.name} - {exercise.sets} sets,  {exercise.reps} reps</p>
              <span>
              <button className="edit-button" onClick={() => handleEdit(exercise)}>Edit</button>
              <button className="delete-button" onClick={ () => { handleDelete(exercise._id)}}>Delete</button>
              </span>
            </div>
            ))       
    ) : (
        <p>No workouts found.</p>  
    )}
 </div>
</div>
</div>
  );
};



export default Workout;