import { Container, TableStyled } from "./styles";
import { Button } from "../Button";

export function Table({ data, headers, dataKeys, onDetailsClick, loading }) {
  if (loading) {
    return (
      <Container>
        <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Carregando dados...</p>
      </Container>
    );
  }

  return (
    <Container>
      <TableStyled>
        <thead>
          <tr>
            {headers.map((header, index) => (
               <th key={index}>{header}</th>
            ))}
            {/* Coluna vazia para o botão de ações */}
            <th></th>
          </tr>
        </thead>

        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
             {dataKeys.map((key) => (
               <td key={key}>{item[key]}</td>
             ))}

             <td>
                <Button 
                  title="Detalhes" 
                  isTableButton
                  onClick={() => onDetailsClick(item)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </Container>
  );
}