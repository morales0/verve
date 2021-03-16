import React, {useState} from 'react';
import { Exercise } from '../../components';
import { Flex } from '../../layout';

import styled from 'styled-components/macro';
import './Workout.css';

const exercises = [
	{
		name: "Pushups"
	},
	{
		name: "Pullups"
	},
	{
		name: "Squats"
	},
	{
		name: "Bench Press"
	},
	{
		name: "Rows"
	},
	{
		name: "Shoulder Press"
	}
]

const Workout = () => {
	// State
	const [currEx, setCurEx] = useState([])
	const [currExNames, setCurExNames] = useState([])



	// Functions
	const addExercise = name => {
		if (!currExNames.includes(name)){ 
			setCurEx([
				...currEx,
				{name: name}
			])

			setCurExNames([
				...currExNames,
				name
			])
		}
	}

	// Render
	return (
		<Flex column>
			<h2>Workout</h2>
			{/* Workout main content */}
			<Flex box item row grow='1' css={`position: relative; overflow: hidden;`}>
				{/* Current workout grids */}
				<Flex box item column grow='1' css={`overflow-y: auto;`}>
					{/* Exercises in progress */}
					<Flex item flex='1 1 auto' css={`
						&>header{
							display: flex;
							padding: 12px 16px;
							background: #c4e4ff8f;
						}
					`}>
						<header>
							<h3>My Workout</h3>
						</header>

						<div className="exercisesContainer">
							{currEx.map((ex)=>
								<Exercise key={ex.name} name={ex.name}/>
							)}
						</div>
					</Flex>

					{/* Completed exercises */}
					<Flex item shrink='0' css={`
						&>header{
							display: flex;
							padding: 12px 16px;
							background: #8fef898f;
						}
					`}>
						<header>
							<h3>Completed</h3>
						</header>

						<div>
							<p>Finish some exercises!</p>
						</div>
					</Flex>
				</Flex>

				{/* Toolbar on the side with exercises */}
				<aside id="exercisesSide">
					<header>
						<h3>Exercises</h3>
					</header>

               <div className="exercisesList">
                  {exercises.filter(ex => !currExNames.includes(ex.name)).map((ex) => 
							<ExerciseInfo key={ex.name} name={ex.name} handleAdd={addExercise}/>
						)}
               </div>
				</aside> 
			</Flex>
		</Flex>
	);
};

const ExerciseInfo = (props) => {
	return (
		<div className="exerciseInfo">
			<button onClick={() => props.handleAdd(props.name)}>+</button>
			<h4>{props.name}</h4>
		</div>
	)
}

export default Workout;
