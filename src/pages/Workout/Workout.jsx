import React from 'react';

import './Workout.css';

const Workout = () => {
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
							<div>Exercise</div>

							<div>Exercise</div>

							<div>Exercise</div>
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
                  <div>
                     Exercise
                  </div>
                  <div>
                     Exercise
                  </div>
                  <div>
                     Exercise
                  </div>

                  <div>
                     Exercise
                  </div>
                  <div>
                     Exercise
                  </div>
                  <div>
                     Exercise
                  </div>
                  
               </div>
				</aside> 
			</div>
		</div>
	);
};

export default Workout;
