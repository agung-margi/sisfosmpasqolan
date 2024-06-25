import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "fullName", label: "Nama", minWidth: 100 },
  { id: "schoolFrom", label: "Asal Sekolah", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

function createData(id, fullName, placeOfBirth, dateOfBirth, schoolFrom, address, phoneNumber, status) {
  return { id, fullName, placeOfBirth, dateOfBirth, schoolFrom, address, phoneNumber, status };
}

function TeacherLayout() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("fullName");
  const [order, setOrder] = React.useState("asc");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/students");
        const students = response.data.students.map((student) =>
          createData(student.id, student.fullName, student.placeOfBirth, student.dateOfBirth, student.schoolFrom, student.address, student.phoneNumber, student.status)
        );
        setRows(students);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    const comparator = (a, b) => {
      if (orderBy === "number") {
        return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      } else {
        const comparison = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
        return order === "asc" ? comparison : -comparison;
      }
    };
    return [...rows].sort(comparator);
  }, [rows, orderBy, order]);

  const onProcessAction = async (student, action) => {
  try {
    const endpoint = `/student/${student.id}/${action}`;
    await axios.put(endpoint);
    const updatedRows = rows.map((row) =>
      row.id === student.id ? { ...row, status: action === "approved" ? "Approved" : "Rejected" } : row
    );
    setRows(updatedRows);
  } catch (error) {
    setError(`Failed to ${action} student: ${error.message}`);
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-10">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 770 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: "bold", textAlign: "center" }}>
                    {column.id !== "number" ? (
                      <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : "asc"} onClick={() => handleRequestSort(column.id)}>
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      <span>{column.label}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ textAlign: "center" }}>
                      {column.id !== "number" ? (
                        column.id === "action" ? (
                          <>
                            <Button variant="contained" color="info" onClick={() => handleOpenModal(row)}>
                              View
                            </Button>
                            <Button variant="contained" color="success" onClick={() => onProcessAction(row, "approved")} sx={{ marginLeft: 1 }}>
                              Approve
                            </Button>
                            <Button variant="contained" color="error" onClick={() => onProcessAction(row, "reject")} sx={{ marginLeft: 1 }}>
                              Reject
                            </Button>
                          </>
                        ) : column.format && typeof row[column.id] === "number" ? (
                          column.format(row[column.id])
                        ) : (
                          row[column.id]
                        )
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 600, minWidth: 300 }}>
          <h2 id="modal-modal-title">Details for {selectedRow && selectedRow.fullName}</h2>
          <p id="modal-modal-description">
            <strong>ID Student:</strong> {selectedRow && selectedRow.id}
            <br />
            <strong>Fullname:</strong> {selectedRow && selectedRow.fullName}
            <br />
            <strong>Place of Birth:</strong> {selectedRow && selectedRow.placeOfBirth}
            <br />
            <strong>Date of Birth:</strong> {selectedRow && selectedRow.dateOfBirth}
            <br />
            <strong>School From:</strong> {selectedRow && selectedRow.schoolFrom}
            <br />
            <strong>Address:</strong> {selectedRow && selectedRow.address}
            <br />
            <strong>Phone Number:</strong> {selectedRow && selectedRow.phoneNumber}
          </p>
        </Box>
      </Modal>
    </div>
  );
}

export default TeacherLayout;
