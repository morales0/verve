import { MuscleGroup, Unit } from '@/types/workout';
import React, { useReducer, createContext, useContext } from 'react';

// Define your state and reducer as before

type FormState = {
  page: number;
  selections: {
    name?: string;
    type?: string;
    units?: Unit[]; 
    primaryMuscleGroups?: MuscleGroup[];
    secondaryMuscleGroups?: MuscleGroup[];
  };
};

type Action =
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'SET_SELECTION'; payload: { key: string; value: any } };

const initialState: FormState = {
  page: 0,
  selections: {},
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'PREV_PAGE':
      return { ...state, page: state.page - 1 };
    case 'SET_SELECTION':
      return {
        ...state,
        selections: {
          ...state.selections,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
}


const ExerciseFormContext = createContext(null);

export const ExerciseFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExerciseFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseFormContext.Provider>
  );
};

export const useExerciseForm = () => useContext(ExerciseFormContext);

// In your ExerciseForm component
export const ExerciseForm = ({ startingName, callback }: ExerciseFormProps) => {
  // Use the ExerciseFormProvider to wrap your component's content
  return (
    <ExerciseFormProvider>
      {/* Your component's content */}
    </ExerciseFormProvider>
  );
};