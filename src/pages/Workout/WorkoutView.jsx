import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AddExercisePopUp from './components/AddExercisePopUp/AddExercisePopUp';
import CompletedExercises from './components/CompletedExercises/CompletedExercises';
import CurrentExercises from './components/CurrentExercises/CurrentExercises';
import { WorkoutPage } from './styles';

const WorkoutView = () => {
	const [exPopUpOpen, setExPopUpOpen] = useState(false);

	const closeExPopUp = () => setExPopUpOpen(false)

	console.log("<WorkoutView /> Re-render")

	return (
		<WorkoutPage>
			{/* PopUps for adding and creating exercises */}
			<AddExercisePopUp
				isOpen={exPopUpOpen}
				close={closeExPopUp}
			/>

			{/* Section for main content */}
			<div className="exercises_container">
				<CurrentExercises
					openExPopUp={() => setExPopUpOpen(true)}
				/>
				
				<CompletedExercises />	
			</div>

			{/* Sidebar for adding and creating exercises? */}

		</WorkoutPage>
	);
};

export default WorkoutView;