import React, { Component } from 'react'
import request from '@apis/common/authRequest'
import { FC, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Submitinfo from '@apis/common/authRequest'
interface Column {
  id: 'name' | 'status' | 'mark' | 'time' | 'memory' | 'language' | 'date'
  label: string
  minWidth?: number
  align?: 'center'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'name', label: 'ID', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  {
    id: 'time',
    label: 'UsingTime\u00a0(ms)',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'memory',
    label: 'Memory\u00a0(kb)',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'language', label: 'Language', minWidth: 130, align: 'center' },
  {
    id: 'date',
    label: 'Submit date',
    minWidth: 130,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
]

interface Data {
  name: string
  status: string
  time: number
  memory: number
  language: string
  date: Date
}

function createData(
  name: string,
  status: string,
  time: number,
  memory: number,
  language: string,
  date: Date
): Data {
  return { name, status, time, memory, language, date }
}

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [pageData, setPageData] = React.useState<any>({})
  useEffect(() =>{
    let data: any = window.sessionStorage.getItem('loginData')
    if (data) {
      data = JSON.parse(data)
      const uid = data?.uid
      if (uid) {
        request('/submission/' + uid).then((data: any) => {
          console.log(data)
          console.log(data.message)
          setPageData(data?.message || [])
        })
      }
    }
  }, [])

  console.log(pageData)
  let rows: any
  if (pageData.map) {
    rows = pageData.map((item: any) =>
      createData(
        item.question_title,
        item.status,
        item.time_used,
        item.space_used,
        item.language,
        item.created_at
      )
    )
  } else {
    rows = []
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ maxWidth: '80%' }}>
      <TableContainer>
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
              .map((row: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.status}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
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
  )
}
