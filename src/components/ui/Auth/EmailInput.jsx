import FormInput from "./FormInput";

const EmailInput = ({ id, value, onChange }) => {
  return (
    <FormInput>
      <label htmlFor={id}>Email</label>
      <input
        type="email"
        required
        id={id}
        placeholder="Email"
        value={value}
        onChange={onChange}
      />
    </FormInput>
  );
};

export default EmailInput;
