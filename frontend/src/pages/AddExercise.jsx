import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/add-exercise.css";

console.log('Rendering AddExercise component');
const AddExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    category: "",
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
      const response = await axios.get("http://localhost:5001/api/exercises/new-exercises");
      
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
          const response= await axios.put(`http://localhost:5001/api/exercises/${exerciseId}`, exerciseData);
          console.log("Exercise updated successfully", response.data);

          setNewExercises((prevExercises) =>
            prevExercises.map((exercise) =>
              exercise._id === exerciseId ? response.data : exercise
            )
          );
        } else {
          // If adding, send POST request
        const response = await axios.post("http://localhost:5001/api/exercises/add-exercise", exerciseData);
        console.log("Exercise added successfully:",response.data);

        setNewExercises((prevNewExercises) => [
          ...prevNewExercises,
          exerciseData, 
        ]);
      }


     
      setExerciseData({ category: "", name: "", sets: 0, reps: 0, duration: "", rest: "" });
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
    const response = await axios.delete(`http://localhost:5001/api/exercises/${id}`);
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
      category: exercise.category || "",
      name: exercise.name || "",
      sets: exercise.sets || 0,
      reps: exercise.reps || 0,
      duration: exercise.duration || "",
      rest: exercise.rest || "",
    });
};


  return (
    <div className="add-exercise-form">
      <h2>{isEditing ? "Edit Exercise" : "Add New Exercise"}</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={exerciseData.category}
          onChange={handleChange}
        />
        <label htmlFor="name">Exercise Name:</label>
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

<button type="submit">{isEditing ? "Update Exercise" : "Add Exercise"}</button>
      </form>

      <div className="exercise-list">
      <h3>New Exercises:</h3>
        {newExercises.length > 0 ? (
          newExercises.map((exercise, index) => (
            <div key={`${exercise._id}-${index}`} className="exercise-item">
              <p style={{ textAlign: "center" }}>{exercise.name} - {exercise.sets} sets,  {exercise.reps} reps</p>
              <button onClick={() => handleEdit(exercise)}>Edit</button>
              <button onClick={ () => { handleDelete(exercise._id)}}>Delete</button>
            </div>
            ))       
    ) : (
        <p>No exercises found.</p>  
    )}
 </div>
</div>
  );
};


export default AddExercise;