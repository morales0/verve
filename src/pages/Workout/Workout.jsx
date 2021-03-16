import React, {useState} from 'react';
import { Exercise } from '../../components';

import './Workout.css';

const exercises = [
	{
		name: "Pushups"
	},
	{
		name: "Pullups"
	}
]

const currEx = []

const Workout = () => {
	// State
	const [currEx, setCurEx] = useState([])


	// Functions
	const addExercise = name => {
		setCurEx([
			...currEx,
			{name: name}
		])
		console.log("Add Exercise: ", name)
	}

	// Render
	return (
		<div className="Workout">
			<h2>Workout</h2>
			<div className="Workout_main">
				<div className="workout_container">
					<div className="exercises" id="progress">
						<header>
							<h3>My Workout</h3>
						</header>

						<div className="exercisesContainer">
							{currEx.map((ex)=>
								<Exercise key={ex.name} name={ex.name}/>
							)}
						</div>
					</div>

					<div className="exercises" id="completed">
						<header>
							<h3>Completed</h3>
						</header>

						<div>
							<p>Finish some exercises!</p>
						</div>
					</div>
				</div>

				<aside id="exercisesSide">
					<header>
						<h3>Exercises</h3>
					</header>

               <div className="exercisesList">
                  {exercises.map((ex) => 
							<ExerciseInfo key={ex.name} name={ex.name} handleAdd={addExercise}/>
						)}
               </div>
				</aside> 
			</div>
		</div>
	);
};

const ExerciseInfo = (props) => {
	return (
		<div className="exerciseInfo">
			<h4>{props.name}</h4>
			<button onClick={() => props.handleAdd(props.name)}>+</button>
		</div>
	)
}

export default Workout;
