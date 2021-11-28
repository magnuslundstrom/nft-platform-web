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
  data: string[][];
}

// eslint-disable-next-line comma-spacing
const Table: React.FC<Props> = ({ headers, data }) => {
  const renderHeaders = headers.map((header) => (
    <TableCell key={header}>{header}</TableCell>
  ));

  //   const renderBody = data.map((obj, index) => {
  //     const keys = Object.keys(obj);
  //     return (
  //       <TableRow key={index}>
  //         {keys.map((key, idx) => (
  //           <TableCell key={idx}>{obj[key]}</TableCell>
  //         ))}
  //       </TableRow>
  //     );
  //   });

  const renderBody = data.map((stringArr, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <TableRow key={idx}>
      {stringArr.map((str) => (
        <TableCell key={str}>{str}</TableCell>
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
