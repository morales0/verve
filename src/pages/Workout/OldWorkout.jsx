import React, { useEffect, useState } from 'react';
import Exercise from './components/Exercise/Exercise';
import { Flex } from '../../layout';

import styled from 'styled-components/macro';
import './Workout.css';

import ogExercises from '../../data/original-exercises'
import { useDatabase, useUser } from 'reactfire';
import { useWorkout } from '../../hooks/workout';
import ExerciseDisplay from './components/Exercise/ExerciseDisplay';
import { ExerciseInfo } from './components/ExerciseToolbar/components';

import AddIcon from '../../images/add.png'
import HamburgerIcon from '../../images/hamburger.png'
import ExerciseToolbar from './components/ExerciseToolbar/ExerciseToolbar';
import { useMediaQuery } from 'react-responsive';
import { Button } from 'components';
import PopUp from 'components/ui/PopUp/PopUp';
import { WorkoutPage } from './styled-components';

const Workout = () => {
	// Hooks
	const workout = useWorkout()
	const [exToAdd, setExToAdd] = useState([]);
	const [toolbarToggled, setToolbarToggled] = useState(false);
	const collapsedToolbar = useMediaQuery({ query: '(max-width: 600px)' })
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
	const [exPopUpOpen, setExPopUpOpen] = useState(false);
	const db = useDatabase()
	const ogExRef = db.ref('original-exercises')


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

	useEffect(() => {
		ogExRef.once('value').then(snapshot => setExToAdd(Object.values(snapshot.val())))
	}, []);

	//// Functions

	// User toggles the exercise toolbar
	const toggleToolbar = () => {
		setToolbarToggled(!toolbarToggled)
	}

	// Mock complete workout
	const completeWorkout = () => {
		alert('not implemented yet!')
		workout.api.completeWorkout()
	}

	const openExercisePopUp = () => {
		setExPopUpOpen(true)
	}

	// Render
	return (
		<WorkoutPage>
			<PopUp isOpen={exPopUpOpen} close={() => setExPopUpOpen(false)} title='Add Exercise' >
				<input type='text' placeholder='Search Exercises' />
				<div>
					{exToAdd.map((ex) =>
						<ExerciseInfo key={ex.name + '-add'} name={ex.name}
							handleAdd={() => workout.api.addExercise(ex.name, ex.measures)}
						/>
					)}
				</div>
			</PopUp>

			<div className="exercises_container">
				<CurrentExercises
					status={workout.status}
				/>
				

				<CompletedExercises 
				
				/>	
			</div>


			<Flex column css={`overflow-y: auto`}>
				{/* Exercises in progress */}
				<Flex column css={`flex-grow: 1;`}>
					<WorkoutHeader className="workoutHeader">
						<h3>My Workout</h3>
						{/* <ToolbarToggle className="workoutToolbarToggle_button" onClick={toggleToolbar} toggled={toolbarToggled}>
							<img src={HamburgerIcon} alt="toggle for exercise list" height="30px" />
						</ToolbarToggle> */}
					</WorkoutHeader>
					<Flex row wrap={true} crossAxis="flex-start" css={`
						padding: .2rem .75rem .75rem .75rem;
						flex-grow: 1;
						align-content: flex-start;
					`}>
						{workout.status === 'loading' ? (
							<p>Loading exercises...</p>
						) : workout.status === 'ok' ? (
							workout.data.numExInProgress > 0 ? (
								// Iterate through the exercises that are not complete
								Object.values(workout.data.exercises).filter(ex => !ex.complete).map((ex, i) => {
									return <Exercise key={ex.name + "-progress"} {...ex} {...workout.api} />
								})
								// No exercises
							) : (
								<div style={{ width: '100%' }}>
									{
										isMobile ? (
											<p>Add some exercises below</p>
										) : (
											<p>Add some exercises from the right!</p>
										)
									}
								</div>
							)
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

					<AddExerciseBtn onClick={openExercisePopUp} isMobile={isMobile}>
						Add Exercise
					</AddExerciseBtn>
				</Flex>

				{/* Completed exercises */}
				<div css={`flex-basis: 100px`}>
					<header css={`
						display: flex;
						justify-content: space-between;
						color: #29b929;
						padding: .4rem .6rem;
					`}>
						<h3>Completed</h3>
						{
							workout.data?.numExCompleted > 0 && workout.data?.numExInProgress === 0 &&
							<Button onClick={completeWorkout}>
								Finish
							</Button>
						}
					</header>

					<Flex row wrap={true} css={`padding: .75rem`} >
						{workout.status === 'ok' && (
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
				exerciseList={exToAdd}
				handleAdd={workout.api.addExercise}
				collapsed={isMobile}
			/>
		</WorkoutPage>
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

const AddExerciseBtn = styled(Button)`
	position: sticky;
	bottom: .5rem;
	display: ${props => props.isMobile ? 'flex' : 'none'};
	padding: .8rem;
	margin: .5rem;
	margin-left: auto;
	background: #f9f9f9;
	border: 1px dashed #999;
	box-shadow: 0 0 3px 1px rgba(0,0,0,15%);
	color: #555;
	font-size: .8rem;
`

export default Workout;
