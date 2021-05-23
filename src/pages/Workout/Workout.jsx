import React, {useEffect, useState} from 'react';
import { Exercise } from '../../components';
import { Flex } from '../../layout';

import styled from 'styled-components/macro';
import './Workout.css';

import ogExercises from '../../data/original-exercises'
import { useDatabase, useUser } from 'reactfire';

const Workout = () => {
	// State + Hooks
	const [currEx, setCurEx] = useState([])
	const [meta, setMeta] = useState({
		inProgress: 0,
		completed: 0
	})
	const [currExNames, setCurExNames] = useState([])
	

	// Subscribe to user workout data
	// useEffect(() => {
	// 	const workout = db.ref(`users/${user.data.uid}/workout`)
	// 	workout.on('value', (snapshot) => {
	// 		if (!snapshot.exists()) {
	// 			console.log("No workout found, add")
	// 			// Add a workout
	// 			workout.set({
	// 				dateStarted: new Date().toString(),
	// 			}).then((ret) => console.log(ret))
	// 			.catch((err) => console.log(err))
	// 		} else {
	// 			console.log("Found", snapshot)
	// 		}
	// 	})
	// });




	// Functions
	const addExercise = name => {
		if (!currExNames.includes(name)){ 
			setCurEx([
				...currEx,
				{
					name: name,
					completed: false,
					sets: [
						[{type: 'reps', value: 10},{type: 'lbs', value: 10}],
						[{type: 'reps', value: 20},{type: 'lbs', value: 10}]
					]
				}
			])

			setMeta((curr) => {
				return {
					...curr,
					inProgress: curr.inProgress + 1
				}
			})

			setCurExNames([
				...currExNames,
				name
			])
		}
	}

	const removeExercise = (exInd) => {
		let copy = [...currEx]
		copy.splice(exInd, 1)

		setCurEx(copy)

		setMeta((curr) => {
			return {
				...curr,
				inProgress: curr.inProgress - 1
			}
		})

		let copyNames = [...currExNames]
		copyNames.splice(exInd, 1)

		setCurExNames(copyNames)
	}

	const completeExercise = (exInd) => {
		let copy = [...currEx]
		console.log(copy[exInd])
		copy[exInd].completed = true;

		setCurEx(copy)
	}

	const addSet = (exInd) => {
		let copy = [...currEx]
		console.log(copy[exInd])
		let setlen = copy[exInd].sets.length;
		let lastSet = copy[exInd].sets[setlen - 1]

		copy[exInd].sets.push([{type: 'reps', value: lastSet[0].value  + 10},
			{type: 'lbs', value: lastSet[1].value + 10}])

		// Set state
		setCurEx(copy)
	}

	const removeSet = (exInd) => {
		let copy = [...currEx]
		if (copy[exInd].sets.length == 1) return;
		copy[exInd].sets.pop()

		// Set state
		setCurEx(copy)
	}

	// Render
	return (
		<div className="Workout">
			<header css={`padding: .5rem 1rem;`}>
				<h2>Workout</h2>
			</header>

			<Flex column css={`overflow-y: auto`}>
				{/* Exercises in progress */}
				<div css={`
					flex-grow: 1;
					& > header {
						padding: .4rem .6rem;
						background: #c4e4ff8f;
					}
				`}>
					<header>
						<h3>My Workout</h3>
					</header>

					<Flex row wrap={true} crossAxis="flex-start" css={`padding: .75rem`} >
						{meta['inProgress'] > 0 ? currEx.filter((ex) => !ex.completed).map((ex, i)=>
							<Exercise key={ex.name} name={ex.name} sets={ex.sets} 
								addSet={() => addSet(i)} removeSet={() => removeSet(i)}
								completeExercise={() => completeExercise(i)}
								removeExercise={() => removeExercise(i)}
							/>
						) : <p>Add some exercises from the right!</p>}
					</Flex>
				</div>

				{/* Completed exercises */}
				<div css={`
					flex-basis: 100px;
					& > header {
						padding: .4rem .6rem;
						background: #f1dfa18f;
					}
				`}>
					<header>
						<h3>Completed</h3>
					</header>


					{/* <Flex mainAxis="center" crossAxis="center" css={`padding: 1rem`}>
						<p>Finish some exercises!</p>
					</Flex> */}

					<Flex row wrap={true} css={`padding: .75rem`} >
						{meta['completed'] > 0 ? currEx.filter((ex) => ex.completed).map((ex, i)=>
							<Exercise key={ex.name} name={ex.name} sets={ex.sets} 
								addSet={() => addSet(i)} removeSet={() => removeSet(i)}
								completeExercise={() => completeExercise(i)}
								removeExercise={() => removeExercise(i)}
							/>
						) : <p>Finish some excercises up there!</p>}
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
                  <ExerciseInfo key={ex.name} name={ex.name} handleAdd={addExercise}/>
               )}
               <ExerciseInput handleAdd={addExercise}/>
            </div>
         </aside> 
		</div>
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
