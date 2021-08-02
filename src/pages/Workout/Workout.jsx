import React, {useEffect, useState} from 'react';
import Exercise from './components/Exercise/Exercise';
import { Flex } from '../../layout';

import styled from 'styled-components/macro';
import './Workout.css';

import ogExercises from '../../data/original-exercises'
import { useDatabase, useUser } from 'reactfire';
import { useWorkout } from '../../hooks/workout';
import ExerciseDisplay from './components/Exercise/ExerciseDisplay';

import AddIcon from '../../images/add.png'
import HamburgerIcon from '../../images/hamburger.png'
import ExerciseToolbar from './components/ExerciseToolbar/ExerciseToolbar';
import { useMediaQuery } from 'react-responsive';

const Workout = () => {
	// Hooks
	const workout = useWorkout()
	const [exToAdd, setExToAdd] = useState([]);
	const [toolbarToggled, setToolbarToggled] = useState(false);
	const collapsedToolbar = useMediaQuery({query: '(max-width: 600px)'})

	//// Lifecycle methods

	// DEV
	useEffect(() => {
		// console.log("Workout re-render")
	});

	// Reset exercise toggle when screen becomes small
	useEffect(() => {
		console.log("Collapsed")
		setToolbarToggled(collapsedToolbar)
	}, [collapsedToolbar]);

	//// Functions

	// User toggles the exercise toolbar
	const toggleToolbar = () => {
		setToolbarToggled(!toolbarToggled)
	}

	// Render
	return (
		<div className="Workout">
			<Flex column css={`overflow-y: auto`}>
				{/* Exercises in progress */}
				<div css={`flex-grow: 1;`}>
					<WorkoutHeader className="workoutHeader">
						<h3>My Workout</h3>
						<ToolbarToggle className="workoutToolbarToggle_button" onClick={toggleToolbar} toggled={toolbarToggled}>
							<img src={HamburgerIcon} alt="toggle for exercise list" height="30px"/>
						</ToolbarToggle>
					</WorkoutHeader>

					<Flex row wrap={true} crossAxis="flex-start" css={`padding: .2rem .75rem .75rem .75rem`} >
						{ workout.status === 'loading' ? (
							<p>Loading exercises...</p>
						) : workout.status === 'ok' ? (
							workout.data.numExInProgress > 0 ? (
								// Iterate through the exercises that are not complete
								Object.values(workout.data.exercises).filter(ex => !ex.complete).map((ex, i) => {
									return <Exercise key={ex.name + "-progress"} {...ex} {...workout.api} />
								})
							// No exercises
							) : <p>Add some exercises from the right!</p>
						// Error with firebase
						) : <p>something is wrong...</p>}
						
						{/* <button css={`
							background: transparent;
							outline: none;
							border: none;
							margin: 0 1rem;
							cursor: pointer;
						`}>
							<img src={AddIcon} alt="button to add exercise" height="30px"/>
						</button> */}
					</Flex>
				</div>

				{/* Completed exercises */}
				<div css={`flex-basis: 100px`}>
					<header css={`
						/*background: linear-gradient(27deg, #abeaab, transparent);*/
						color: #29b929;
						padding: .4rem .6rem;
					`}>
						<h3>Completed</h3>
					</header>

					<Flex row wrap={true} css={`padding: .75rem`} >
						{ workout.status === 'ok' && (
							workout.data.numExCompleted > 0 ? (
								// Render completed exercises in a "read only" mode
								Object.values(workout.data.exercises).filter(ex => ex.complete).map((ex, i) => {
									//<Exercise key={ex.name + i + "progress"} eid={ex.id} complete={true}/>
									return <ExerciseDisplay {...ex} undoExercise={() => workout.api.unCompleteExercise(ex.name)} />
								})
							) : <p>Finish some exercises!</p>)}
					</Flex>
				</div>
			</Flex>

         {/* Toolbar on the side with exercises */}
         <ExerciseToolbar 
				exerciseList={ogExercises} 
				handleAdd={workout.api.addExercise} 
				collapsed={collapsedToolbar && toolbarToggled} 
			/>
		</div>
	);
};

const WorkoutHeader = styled.header`
	display: flex; 
	justify-content: space-between; 
	padding: .4rem .6rem;
`

const ToolbarToggle = styled.button`
	display: none;
	outline: none;
	border: none;
	background: white;
	padding: none;
	transition: 1s;

	@media (max-width: 600px) {
		display: block;
		transform: translate(${props => props.toggled ? '0' : '-250px'});
	}
`

export default Workout;
