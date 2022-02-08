import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import AddExercisePopUp from './components/AddExercisePopUp/AddExercisePopUp';
import AddExerciseScreen from './components/AddExerciseScreen/AddExerciseScreen';
import CompletedExercises from './components/CompletedExercises/CompletedExercises';
import CompletedScreen from './components/CompletedScreen/CompletedScreen';
import CurrentExercises from './components/CurrentExercises/CurrentExercises';
import CurrentExerciseScreen from './components/CurrentExerciseScreen/CurrentExerciseScreen';
import { StyledWorkoutView, Body } from './styles';
import { useWorkout } from './WorkoutContainer';

const WorkoutView = () => {
	const [exPopUpOpen, setExPopUpOpen] = useState(false);
	const { workoutData, pageState: { currScreen, setCurrScreen}, api } = useWorkout()

	const currExercise = workoutData.data['current-exercise']

   console.log("--- <WorkoutView />")


	const closeExPopUp = () => setExPopUpOpen(false)

	useEffect(() => {
		if (currExercise) {
			setCurrScreen("exercise")
		} else {
			setCurrScreen("add")
		}

	}, [currExercise, setCurrScreen]);

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
			<CompletedScreen 
				exercises={workoutData.data["completed-exercises"]}
				cancelWorkout={api.cancelWorkout}
				completeWorkout={api.completeWorkout}
			/>
			{
				currScreen === "add" ? (
					<AddExerciseScreen 
						onAdd={() => setCurrScreen("exercise")}
					/>
				) : currScreen === "exercise" && currExercise ? (
					<CurrentExerciseScreen 
						name={currExercise?.name}
						measures={currExercise?.measures}
						starterSets={currExercise?.sets}
					/>
				) : currScreen === "loading" ? (
					<div>Loading workout</div>
				) : (
					<div>Summary</div>
				)
			}
			
		</StyledWorkoutView>
	)
};

export default WorkoutView;