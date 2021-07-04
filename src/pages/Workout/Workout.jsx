import React, {useEffect, useState} from 'react';
import Exercise from './components/Exercise/Exercise';
import { Flex } from '../../layout';

import styled from 'styled-components/macro';
import './Workout.css';

import ogExercises from '../../data/original-exercises'
import { useDatabase, useUser } from 'reactfire';
import { useWorkout } from '../../hooks/workout';

const Workout = () => {
	// State + Hooks
	const [currEx, setCurEx] = useState([])
	const [meta, setMeta] = useState({
		inProgress: 0,
		completed: 0
	})
	const [currExNames, setCurExNames] = useState([])

	// Hooks
	const workout = useWorkout()

	// Render
	return (
		<div className="Workout">
			<Flex column css={`overflow-y: auto`}>
				{/* Exercises in progress */}
				<div css={`flex-grow: 1;`}>
					<header css={`padding: .4rem .6rem`}>
						<h3>My Workout</h3>
					</header>

					<Flex row wrap={true} crossAxis="flex-start" css={`padding: .2rem .75rem .75rem .75rem`} >
						{ workout.status === 'loading' ? (
							<p>Loading exercises...</p>
						) : workout.status === 'ok' ? (
							workout.data.numExInProgress > 0 ? (
								// Iterate through the exercises that are not complete
								Object.values(workout.data.exercises).filter(ex => !ex.completed).map((ex, i) => {
									return <Exercise key={ex.name + "-progress"} 
										eid={ex.id} name={ex.name} 
										completeExercise={() => {workout.api.completeExercise(ex.name)}} 
										removeExercise={()=>{workout.api.removeExercise(ex.name)}} 
										sets={ex.sets} 
										addSet={()=>{workout.api.addSet(ex.name)}} 
										removeSet={()=>{workout.api.removeSet(ex.name)}}
										updateSet={(setInd, measure, newVal) =>
											workout.api.updateSet(ex.name, setInd, measure, newVal)
										}
									/>
								})
							// No exercises
							) : <p>Add some exercises from the right!</p>
						// Error with firebase
						) : <p>something is wrong...</p>}
					</Flex>
				</div>

				{/* Completed exercises */}
				<div css={`flex-basis: 100px`}>
					<header css={`
						background: #b4e6b4;
						padding: .4rem .6rem;
					`}>
						<h3>Completed</h3>
					</header>

					<Flex row wrap={true} css={`padding: .75rem`} >
						{ workout.status === 'ok' && (
							workout.data.numExCompleted > 0 ? (
								// Render completed exercises in a "read only" mode
								workout.data.exCompleted.filter(ex => ex.completed).map((ex, i) => {
									//<Exercise key={ex.name + i + "progress"} eid={ex.id} complete={true}/>
									<div>ex.name</div>
								})
							) : <p>Finish some exercises!</p>)}
					</Flex>
				</div>
			</Flex>

         {/* Toolbar on the side with exercises */}
         <aside className="exList">
            <header>
               <h3>Exercises</h3>
            </header>

            <div className="exercisesList">
               {ogExercises.filter(ex => !currExNames.includes(ex.name)).map((ex) => 
                  <ExerciseInfo key={ex.name + '-add'} name={ex.name} 
							handleAdd={() => workout.api.addExercise(ex.name, ex.measures)}
						/>
               )}
               <ExerciseInput handleAdd={() => workout.api.addExercise('Basic', ['reps'])}/>
            </div>
         </aside> 
		</div>
	);
};

const ExerciseInfo = (props) => {
	return (
		<div className="exerciseInfo">
			<button onClick={props.handleAdd}>+</button>
			<h4>{props.name}</h4>
		</div>
	)
}

const ExerciseInput = (props) => {
	return (
		<div className="exerciseInfo">
			<button onClick={() => props.handleAdd(props.name)}>+</button>
			<h4>
				<input type="text" placeholder="New Exercise"/>
			</h4>
		</div>
	)
}

export default Workout;
