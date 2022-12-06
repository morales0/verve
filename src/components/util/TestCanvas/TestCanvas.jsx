import { Button } from "components";
import { TextInput } from "components/ui";
import styled from "styled-components/macro";

const TestCanvas = (props) => {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 1rem;
      `}
    >
      <TextInput />
      <Button btnStyle="danger" size="small">
        Base Button
      </Button>
      <Button btnStyle="success">Base Button</Button>
      <Button size="large">Base Button</Button>
    </div>
  );
};

export default TestCanvas;
