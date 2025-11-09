import { Container } from "./styles";

export function SelectInput({ placeholder, options = [], ...rest }) {
  return (
    <Container>
      <select {...rest}>
        <option value="">{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </Container>
  );
}
