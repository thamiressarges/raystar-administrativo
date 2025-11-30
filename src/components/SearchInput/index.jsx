import { FiSearch } from 'react-icons/fi';
import { Container, SearchButton } from './styles';

export function SearchInput({ placeholder, ...rest }) {
  return (
    <Container>
      <input type="text" placeholder={placeholder} {...rest} />
      <SearchButton type="button">
        <FiSearch size={18} />
      </SearchButton>
    </Container>
  );
}