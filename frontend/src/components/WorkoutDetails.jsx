// import { useState } from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import formatDistanceToNow from "date-fns/formatDistanceToNow"

// const WorkoutDetails = ({ workout }) => {
//   const { dispatch } = useWorkoutsContext()
//   const [isEditing, setIsEditing] = useState(false)
//   const [title, setTitle] = useState(workout.title)

//   const handleEdit = async () => {
    
//     try {
//       setIsEditing(true)
//       const response = await fetch('/api/workouts/' + workout._id, {
//         method: 'PATCH',
//         body: JSON.stringify({title: title}),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })

//       const json = await response.json()
//       console.log("HANDLING EDIT")

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json })
//         console.log('Workout updated successfully')
//       }
//       else {
//         console.log('Failed to update workout')
//       }
//     }
//     catch (error) {
//       console.log('An error occurred while updating the workout:', error)
//     }
//     finally {
//       setIsEditing(false)
//     }


//     // if (response.ok) {
//     //   dispatch({type: 'UPDATE_WORKOUT', payload: json})
//     // }
//   }

  // const handleDelete = async () => {
    
  //   const response = await fetch('/api/workouts/' + workout._id, {
  //     method: 'DELETE'
  //   })
  //   const json = await response.json()

  //   if (response.ok) {
  //     dispatch({type: 'DELETE_WORKOUT', payload: json})
  //   }
  // }

//   return (
//     <div className="workout-details">
//         {/* <h4>{workout.title}</h4> */}
//         {isEditing ? 
//         <form onSubmit={handleEdit}>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
//           <button type="submit">Submit</button></form>
//         : <h4>{workout.title}</h4>
//         }

//         <p><strong>Load (kg): </strong>{workout.load}</p>
//         <p><strong>Reps: </strong>{workout.reps}</p>
//         <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
//         <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
//         <span className="material-symbols-outlined del" onClick={handleDelete}>delete</span>
//     </div>
//   )
// }

// export default WorkoutDetails


import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);

  const handleEdit = async (e) => {
    // e.preventDefault()
    if (isEditing) {
      try {
        // Make the PATCH request to update the workout
        const response = await fetch('/api/workouts/' + workout._id, {
          method: 'PATCH',
          body: JSON.stringify({ title }), // Include the updated title in the request body
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const json = await response.json();
        console.log(title)

        if (response.ok) {
          dispatch({ type: 'UPDATE_WORKOUT', payload: json });
          console.log('Workout updated successfully.');
          setTitle((prevWorkout) => ({ ...prevWorkout, title: json.title }))
        } else {
          console.log('Failed to update workout:', json);
        }
      } catch (error) {
        console.log('An error occurred while updating the workout:', error);
      } finally {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      {isEditing ? (
        <form id="workout-form" name="myform" onSubmit={handleEdit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {/* <button type="submit">Submit</button> */}
          {<span className={"material-symbols-outlined"}></span>}
        </form>
      ) : (
        <h4>{workout.title}</h4>
      )}
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      {isEditing ? '' : <span className={"material-symbols-outlined"} onClick={handleEdit}>edit</span>}
      {/* {isEditing ? <span id="btn-submit">Submit</span>: <span className={"material-symbols-outlined"} onClick={handleEdit}>edit</span>} */}
      {/* <span className={isEditing ? "" : "material-symbols-outlined"} onClick={handleEdit}>
        {isEditing ? 'Submit' : 'edit'}
      </span> */}
      <span className="material-symbols-outlined del" onClick={handleDelete}>delete</span>
    </div>
  );
};

export default WorkoutDetails