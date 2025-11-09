import { Container, TableStyled } from "./styles";
import { Button } from "../../components/Button";

export function Table({ data, headers, dataKeys, onDetailsClick }) {
  return (
    <Container>
      <TableStyled>
        <thead>
          <tr>
            {headers.map((header, index) => (
               <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
             {/* NOVIDADE: Mapeia sobre as chaves (dataKeys) para renderizar as células */}
             {dataKeys.map((key) => (
               <td key={key}>{item[key]}</td> // Acessa o valor dinamicamente pela chave
             ))}

             <td>
                <Button 
                  title="DETALHES" 
                  isTableButton // Aplica os estilos compactos da tabela
                  onClick={onDetailsClick}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </Container>
  );
}