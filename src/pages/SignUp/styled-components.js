import styled from "styled-components";

const TextInputStyle = styled.div`
   margin-bottom: .5rem;

   & > label {
      display: inline-block;
      margin-bottom: 4px;
   }

   & > input[type="text"] {
      display: block;
      padding: .4rem;
      width: 100%;
      font-size: .9rem;
   }
`

const TextInput = ({ label, id, placeholder, value, onChange }) => {
   return (
      <TextInputStyle>
         <label htmlFor={id}>
            {label}
         </label>
         <input type="text" required id={id} placeholder={placeholder} 
            value={value} onChange={onChange}
         />
      </TextInputStyle>
   )
}

export {
   TextInput
}