import { Container } from "./styles";

export function SelectInput({ placeholder, options = [], ...rest }) {
    return (
        <Container>
            <select {...rest} defaultValue="">
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </Container>
    );
}