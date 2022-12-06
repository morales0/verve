import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  if (props.item) {
    return (
      <StyledFlexItem as={props.box && StyledFlexContainer} {...props}>
        {props.children}
      </StyledFlexItem>
    );
  } else {
    return (
      <StyledFlexContainer {...props}>{props.children}</StyledFlexContainer>
    );
  }
};

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  justify-content: ${(props) =>
    props.mainAxis ? props.mainAxis : "flex-start"};
  align-items: ${(props) => (props.crossAxis ? props.crossAxis : "stretch")};
`;

const StyledFlexItem = styled.div`
  flex-shrink: ${(props) => (props.shrink ? props.shrink : "1")};
  flex-grow: ${(props) => (props.grow ? props.grow : "0")};
  flex-basis: ${(props) => (props.basis ? props.basis : "auto")};
  ${(props) => (props.flex ? "flex: " + props.flex + ";" : "")}
  order: ${(props) => (props.order ? props.order : "0")};
  align-self: ${(props) =>
    props.start
      ? "start"
      : props.end
      ? "end"
      : props.center
      ? "center"
      : props.baseline
      ? "baseline"
      : props.stretch
      ? "stretch"
      : "auto"};
`;

export default Flex;
