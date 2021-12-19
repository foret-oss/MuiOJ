import React, { Component } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'name' | 'status' | 'time' | 'memory' |'language'| 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'ID', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  {
    id: 'time',
    label: 'UsingTime\u00a0(ms)',
    minWidth: 130,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'memory',
    label: 'Memory\u00a0(kb)',
    minWidth: 130,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'language', label: 'Language', minWidth: 130 ,align: 'right',},
  {
    id: 'date',
    label: 'Submit date',
    minWidth: 130,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  status: string;
  time: number;
  memory: number;
  language:string;
  date: string;
}

function createData(
  name: string,
  status: string,
  time: number,
  memory: number,
  language:string,
): Data {
  const date = new Date().toDateString();
  return { name, status, time, memory, language, date };
}

const rows = [
  createData('1.A+BProblem', 'pass', 1324171354, 3287263,'C++11'),
  createData('3.Copycat', 'pass', 1403500365, 9596961,'C++11'),
  createData('6.GuessNumber', 'pass', 60483973, 301340,'C++11'),
  createData('102.最小费用流', 'pass', 327167434, 9833520,'C++11'),
  createData('107.维护全序集', 'fail', 37602103, 9984670,'C++11'),
  createData('113.最大异或和', 'pass', 25475400, 7692024,'C++11'),
  createData('116.有源汇有上下界最大流', 'fail', 83019200, 357578,'C++11'),
  createData('118.正则表达式', 'pass', 4857000, 70273,'C++11'),
  createData('119.单源最短路', 'fail', 126577691, 1972550,'C++11'),
  createData('124.除数函数求和', 'fail', 126317000, 377973,'C++11'),
  createData('125.除数函数幂和', 'pass', 67022000, 640679,'C++11'),
  createData('500.「LibreOJβRound」ZQC的拼图', 'pass', 67545757, 242495,'C++11'),
  createData('505.「LibreOJβRound」ZQC的游戏', 'pass', 146793744, 17098246,'C++11'),
  createData('506.「LibreOJβRound」ZQC的作业', 'pass', 200962417, 923768,'C++11'),
  createData('509.「LibreOJNOIRound#1」动态几何问题', 'fail', 210147125, 8515767,'C++11'),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '84%', marginTop: '50px',marginLeft: '-1rem' ,}}>
      <TableContainer sx={{ maxHeight: 440,maxWidth:'100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
              Result
              </TableCell>
              <TableCell align="center" colSpan={3}>
              Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.status}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

