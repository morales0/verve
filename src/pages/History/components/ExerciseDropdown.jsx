import { useState } from "react";
import styled from "styled-components";

// components
import { TriangleToggle } from "components/ui";

const Container = styled.div`
   
`

const Header = styled.header`
   display: flex;
   align-items: center;
   justify-content: space-between;
`

const DataCollapse = styled.div`
   overflow-x: auto;
`

const ExerciseDropdown = ({ name, sets }) => {
   const [open, setOpen] = useState(false);

   return (
      <Container>
         <Header>
            <h3>{name}</h3>
            <TriangleToggle open={open} onClick={() => setOpen(!open)} />
         </Header>
         {
            open && sets &&
            <DataCollapse>
               {sets.map((set, i) => (
                  <div key={`${name}-set-${i}`}>
                     Set {i}
                     {Object.entries(set).map(([measure, value], j) => (
                        <div key={`${name}-set-${i}-${measure}-${j}`} >
                           {measure}: {value}
                        </div>
                     ))}
                  </div>
               ))}
            </DataCollapse>
         }
      </Container>
   );
}
 
export default ExerciseDropdown;