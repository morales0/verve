import FormInput from "./FormInput";

const PasswordInput = ({ id, value, onChange }) => {
  return (
    <FormInput>
      <label htmlFor={id}>Password</label>
      <input
        type="password"
        required
        id={id}
        placeholder="Password"
        value={value}
        onChange={onChange}
      />
    </FormInput>
  );
};

export default PasswordInput;
