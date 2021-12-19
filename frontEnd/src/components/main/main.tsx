import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './main.css'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#a6c1ee',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  Notice: string,
  Way: string,
  Uploader: string,
  Date: string,
) {
  return { Notice, Way, Uploader, Date };
}

const rows = [
  createData('hust-oj coming', 'by', 'hust-group', '2021年12月18日'),
  createData('', '', '', '' ),
  createData('', '', '', ''),
  createData('', '', '', ''),
  createData('', '', '', ''),
];

export default function CustomizedTables() {
  return (
    
    <TableContainer sx={{ minWidth: "100px" }} component={Paper} className="table-container">
      <Table sx={{ width: "84%" }} aria-label="customized table">
        <TableHead>
        <h3>公告栏</h3>
          <TableRow>
            <StyledTableCell>Notice</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right">Uploader</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Notice}>
              <StyledTableCell component="th" scope="row"><a href="http://www.w3school.com.cn">
                {row.Notice}
              </a>
              </StyledTableCell>
              <StyledTableCell align="right">{row.Way}</StyledTableCell>
              <StyledTableCell align="right">{row.Uploader}</StyledTableCell>
              <StyledTableCell align="right">{row.Date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}