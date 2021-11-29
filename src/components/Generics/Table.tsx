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

// eslint-disable-next-line comma-spacing
const Table: React.FC<Props> = ({ headers, tableElements }) => {
  const renderHeaders = headers.map((header) => (
    <TableCell key={header}>{header}</TableCell>
  ));

  const renderBody = tableElements.map((outer, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <TableRow key={idx}>
      {outer.map((inner, idx1) => (
        // eslint-disable-next-line react/no-array-index-key
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
