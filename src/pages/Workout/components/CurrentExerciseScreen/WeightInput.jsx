import { useState } from "react";
import { WeightChoiceContainer } from "./styles";

const WeightInput = ({ givenValue = 0 }) => {
  const [value, setValue] = useState(givenValue);
  const [option, setOption] = useState("choice");

  return (
    <div>
      {option === "choice" ? (
        <WeightChoiceContainer>
          <div className="value">{value}</div>
          <div className="choices">
            <button></button>
          </div>
        </WeightChoiceContainer>
      ) : (
        <div>input</div>
      )}
    </div>
  );
};

export default WeightInput;
