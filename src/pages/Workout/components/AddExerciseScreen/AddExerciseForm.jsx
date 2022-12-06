import { useState } from "react";
import styled from "styled-components";
import EditIcon from "images/edit.png";
import { TextInput } from "components/ui";

const StyledAddExerciseForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const ExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  & .exercise_info_container {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;

const ExerciseAddBtn = styled.button`
  display: flex;
  align-items: stretch;
  width: fit-content;
  font-size: 1rem;

  color: inherit;
  background-color: transparent;
  border: none;
  border: 1px solid #b9b9b9;
  cursor: pointer;

  & > .plus {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    color: #90e790;
    border-right: 1px solid #999;
  }

  & > .name {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }
`;

const ExerciseEditBtn = styled.button`
  padding: 0.3rem;
  margin-left: 0.6rem;
  font-size: 0.8rem;
  border: none;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
`;

const AddExerciseForm = ({ exercisesToAdd, handleAdd, handleEdit, onAdd }) => {
  const [filterQuery, setFilterQuery] = useState("");

  const filterExercises = () => {
    return exercisesToAdd?.filter(
      (e) =>
        filterQuery === "" ||
        e.name.toLowerCase().startsWith(filterQuery.toLowerCase()) ||
        e.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  };

  const addExercise = (e) => {
    handleAdd(e);
    onAdd();
  };

  return (
    <StyledAddExerciseForm>
      <TextInput
        placeholder="Search for exercise"
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      />
      <ExercisesContainer>
        {exercisesToAdd.length === 0 ? (
          <p>Maybe try creating some exercises</p>
        ) : (
          filterExercises()?.map((e, i) => (
            <div
              className="exercise_info_container"
              key={`exToAdd-${e.name}-${i}`}
            >
              <ExerciseAddBtn onClick={() => addExercise(e)}>
                <div className="plus">+</div>
                <p className="name">{e.name}</p>
              </ExerciseAddBtn>
              <ExerciseEditBtn onClick={() => handleEdit(e)}>
                <img src={EditIcon} alt="edit icon" height={23} />
              </ExerciseEditBtn>
            </div>
          ))
        )}
      </ExercisesContainer>
    </StyledAddExerciseForm>
  );
};

export default AddExerciseForm;
