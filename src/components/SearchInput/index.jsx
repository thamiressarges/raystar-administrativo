import { Container, SearchButton } from './styles';
import { FiSearch } from 'react-icons/fi';

export function SearchInput({ placeholder, ...rest }) {
  return (
    <Container>
      <input type="text" placeholder={placeholder} {...rest} />
      <SearchButton>
        <FiSearch size={18} color="#fff" />
      </SearchButton>
    </Container>
  );
}
