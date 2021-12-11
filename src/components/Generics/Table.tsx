/* eslint-disable react/no-array-index-key */
import {
  Table as MuiTable,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';

interface Props {
  headers: string[];
  tableElements: React.ReactNode[][];
}

const Table: React.FC<Props> = ({ headers, tableElements }) => {
  const renderHeaders = headers.map((header) => (
    <TableCell key={header}>{header}</TableCell>
  ));

  const renderBody = tableElements.map((outer, idx) => (
    <TableRow key={idx}>
      {outer.map((inner, idx1) => (
        <TableCell key={`${idx}-${idx1}`}>{inner}</TableCell>
      ))}
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>{renderHeaders}</TableRow>
        </TableHead>
        <TableBody>{renderBody}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
