import styled from "styled-components";
import "./ExerciseToolbar.scss";

const ExerciseToolbarAside = styled.aside`
  display: ${(props) => (props.collapsed ? "none" : "flex")};
  /* @media screen and (max-width: 600px){
      transform: translate(${(props) => (props.collapsed ? "250px" : "0")});
   } */
`;

const ExerciseInfo = (props) => {
  return (
    <div className="exerciseInfo_button">
      <button onClick={props.handleAdd}>+</button>
      <h4>{props.name}</h4>
    </div>
  );
};

const ExerciseInput = (props) => {
  return (
    <div className="exerciseInfo">
      <button onClick={() => props.handleAdd(props.name)}>+</button>
      <h4>
        <input type="text" placeholder="New Exercise" />
      </h4>
    </div>
  );
};

export { ExerciseToolbarAside, ExerciseInfo };
