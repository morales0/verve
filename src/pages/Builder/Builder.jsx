import { PageHeader } from "components";
import "./Builder.scss";

// Hooks
import useBuilder from "./useBuilder";

const pageToggle = "on";

const Builder = (props) => {
  const { status, data, api } = useBuilder();

  if (pageToggle === "off") {
    return <div style={{ padding: "1rem" }}>Builder coming soon!</div>;
  }

  return (
    <div className="Builder_page">
      <PageHeader title="Exercise Builder" />
      <div>
        <div>
          <label for="exerciseName">Name:</label>
          <input
            type="text"
            id="exerciseName"
            value={data.name}
            onChange={(e) => api.setName(e.target.value)}
          />
        </div>

        <div>
          <h3>Measures</h3>
          <div>
            <div>
              <input type="checkbox" id="exerciseMeasure-reps" />
              <label for="exerciseMeasure-reps">Reps</label>
            </div>
            <div>
              <input type="checkbox" id="exerciseMeasure-weight" />
              <label for="exerciseMeasure-weight">Weight</label>
            </div>
            <div>
              <input type="checkbox" id="exerciseMeasure-time" />
              <label for="exerciseMeasure-time">Time</label>
            </div>
            <div>
              <input type="checkbox" id="exerciseMeasure-distance" />
              <label for="exerciseMeasure-distance">Distance</label>
            </div>
          </div>
        </div>

        <div>
          <h3>Muscle Groups</h3>
          <div>
            <div>
              <input type="checkbox" id="exerciseMuscle-quads" />
              <label for="exerciseMuscle-quads">Quads</label>
            </div>
            <div>
              <input type="checkbox" id="exerciseMuscle-chest" />
              <label for="exerciseMuscle-chest">Chest</label>
            </div>
            <div>
              <input type="checkbox" id="exerciseMuscle-lats" />
              <label for="exerciseMuscle-lats">Lats</label>
            </div>
          </div>
        </div>

        <div>
          <button>Cancel</button>

          <button>Create</button>
        </div>
      </div>
    </div>
  );
};

// Components (migrate ASAP)

// Search

// Text Input

// Checkbox group

// Checkbox

export default Builder;
