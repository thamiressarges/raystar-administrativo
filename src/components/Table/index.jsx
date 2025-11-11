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
             {dataKeys.map((key) => (
               <td key={key}>{item[key]}</td>
             ))}

             <td>
                <Button 
                  title="DETALHES" 
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
