import { Container } from './styles';

export function Button({ title, isTableButton, ...rest }) {
    return (
        <Container 
            type="button" 
            $isTableButton={isTableButton}
            {...rest}
        >
            {title}
        </Container>
    );
}