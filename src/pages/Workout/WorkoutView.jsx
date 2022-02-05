import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import AddExercisePopUp from './components/AddExercisePopUp/AddExercisePopUp';
import AddExerciseScreen from './components/AddExerciseScreen/AddExerciseScreen';
import CompletedExercises from './components/CompletedExercises/CompletedExercises';
import CompletedScreen from './components/CompletedScreen/CompletedScreen';
import CurrentExercises from './components/CurrentExercises/CurrentExercises';
import { StyledWorkoutView, Body } from './styles';

const WorkoutView = () => {
	const [exPopUpOpen, setExPopUpOpen] = useState(false);
	const [pageState, setPageState] = useState("add");

   console.log("--- <WorkoutView />")


	const closeExPopUp = () => setExPopUpOpen(false)

	// return (
	// 	<StyledWorkoutView>
	// 		{/* PopUps for adding and creating exercises */}
	// 		<AddExercisePopUp
	// 			isOpen={exPopUpOpen}
	// 			close={closeExPopUp}
	// 		/>

	// 		{/* Section for main content */}
	// 		<Body>
	// 			<CurrentExercises
	// 				openExPopUp={() => setExPopUpOpen(true)}
	// 			/>
				
	// 			<CompletedExercises />
	// 		</Body>

	// 		{/* Sidebar for adding and creating exercises? */}

	// 	</StyledWorkoutView>
	// );

	return (
		<StyledWorkoutView>
			<CompletedScreen />
			{
				pageState === "add" ? (
					<AddExerciseScreen 
						onAdd={() => setPageState("exercise")}
					/>
				) : pageState === "exercise" ? (
					<div>Exercise</div>
				) : pageState === "completed" ? (
					<div>Completed screen</div>
				) : (
					<div>Summary</div>
				)
			}
			
		</StyledWorkoutView>
	)
};

export default WorkoutView;