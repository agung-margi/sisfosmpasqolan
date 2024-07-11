import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Button, Modal, Box,
} from "@mui/material";
import axios from "../../axiosConfig";
import TokenContext from "../../components/data/AuthTokenContext";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "fullName", label: "Nama", minWidth: 100 },
  { id: "schoolFrom", label: "Asal Sekolah", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

const createData = (id, fullName, placeOfBirth, dateOfBirth, schoolFrom, address, phoneNumber, status, images, userId) => ({
  id, fullName, placeOfBirth, dateOfBirth, schoolFrom, address, phoneNumber, status, images, userId
});

function PPDBLayout() {
  const { tokenInfo } = useContext(TokenContext);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("fullName");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/students", {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      const students = response.data.students.map((student) =>
        createData(student.id, student.fullName, student.placeOfBirth, student.dateOfBirth, student.schoolFrom, student.address, student.phoneNumber, student.status, student.images, student.userId)
      );
      setRows(students);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenInfo.token) {
      fetchData();
    }
  }, [tokenInfo]);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortedRows = useMemo(() => {
    const comparator = (a, b) => {
      if (orderBy === "number") return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      const comparison = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
      return order === "asc" ? comparison : -comparison;
    };
    return [...rows].sort(comparator);
  }, [rows, orderBy, order]);

  const onProcessAction = async (student, action) => {
    try {
      const endpoint = `/student/${student.id}/${action}`;
      await axios.put(endpoint, null, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      fetchData();
    } catch (error) {
      console.error(`Failed to ${action} student:`, error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teacher-layout">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, textAlign: "center" }}>
                    <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : "asc"} onClick={() => handleRequestSort(column.id)}>
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ textAlign: "center" }}>
                      {column.id === "number" ? index + 1 : column.id === "action" ? (
                        <>
                          <Button variant="contained" color="info" onClick={() => handleOpenModal(row)}>View</Button>
                          <Button variant="contained" color="success" onClick={() => onProcessAction(row, "approved")} sx={{ marginLeft: 1 }}>Approve</Button>
                          <Button variant="contained" color="error" onClick={() => onProcessAction(row, "reject")} sx={{ marginLeft: 1 }}>Reject</Button>
                        </>
                      ) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 600, minWidth: 300 }}>
          <h2>Details for {selectedRow?.fullName}</h2>
          <table>
            <tbody>
              {selectedRow && Object.entries(selectedRow).map(([key, value]) => (
                <tr key={key}>
                  <th style={{ textAlign: "left", padding: "8px" }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</th>
                  <td style={{ textAlign: "left", padding: "8px" }}>{Array.isArray(value) ? value.map((img, idx) => <img key={idx} src={img.imageUrl} alt={`student-${idx}`} style={{ width: "24px", height: "24px", marginRight: "8px" }} />) : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}

export default PPDBLayout;
