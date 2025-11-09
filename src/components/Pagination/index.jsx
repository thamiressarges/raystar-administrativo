import { Container, PaginationButton } from './styles';

export function Pagination({ totalPages, currentPage, onPageChange }) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Container>
            {pageNumbers.map(number => (
                <PaginationButton
                    key={number}
                    onClick={() => onPageChange(number)}
                    $isactive={number === currentPage}
                >
                    {number}
                </PaginationButton>
            ))}
        </Container>
    );
}