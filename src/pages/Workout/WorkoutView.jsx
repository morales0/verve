import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AddExercisePopUp from './components/AddExercisePopUp/AddExercisePopUp';
import CompletedExercises from './components/CompletedExercises/CompletedExercises';
import CurrentExercises from './components/CurrentExercises/CurrentExercises';
import { StyledWorkoutView, Body } from './styles';

const WorkoutView = () => {
	const [exPopUpOpen, setExPopUpOpen] = useState(false);

   console.log("--- <WorkoutView />")


	const closeExPopUp = () => setExPopUpOpen(false)

	return (
		<StyledWorkoutView>
			{/* PopUps for adding and creating exercises */}
			<AddExercisePopUp
				isOpen={exPopUpOpen}
				close={closeExPopUp}
			/>

			{/* Section for main content */}
			<Body>
				<CurrentExercises
					openExPopUp={() => setExPopUpOpen(true)}
				/>
				
				<CompletedExercises />
			</Body>

			{/* Sidebar for adding and creating exercises? */}

		</StyledWorkoutView>
	);
};

export default WorkoutView;