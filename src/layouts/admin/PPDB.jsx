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

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "NIP", label: "NIP", minWidth: 170 },
  { id: "fullname", label: "Nama Lengkap", minWidth: 100 },
  {
    id: "jabatan",
    label: "Jabatan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "alamat",
    label: "Alamat",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

function createData(NIP, fullname, jabatan, alamat, status) {
  return { NIP, fullname, jabatan, alamat, status };
}

const rows = [
  createData("123456", "John Doe", "Manager", "123 Main St, New York", "process"),
  createData("234567", "Jane Smith", "Developer", "456 Elm St, San Francisco", "process"),
  createData("345678", "Michael Johnson", "Analyst", "789 Oak St, Chicago", "process"),
  createData("456789", "Emily Davis", "Designer", "321 Pine St, Los Angeles", "approved"),
  createData("567890", "David Wilson", "Engineer", "654 Maple St, Boston", "approved"),
  createData("678901", "Sarah Brown", "Manager", "987 Cedar St, Seattle", "process"),
  createData("789012", "Chris Lee", "Developer", "654 Birch St, Austin", "approved"),
  createData("890123", "Amanda Taylor", "Analyst", "321 Cedar St, Miami", "process"),
  createData("901234", "Matthew Clark", "Designer", "789 Pine St, Denver", "approved"),
  createData("012345", "Jessica Martinez", "Engineer", "456 Oak St, Portland", "process"),
  createData("123123", "Daniel Rodriguez", "Manager", "987 Elm St, Atlanta", "process"),
  createData("234234", "Laura Hernandez", "Developer", "654 Maple St, Houston", "rejected"),
  createData("345345", "Kevin Gonzalez", "Analyst", "321 Cedar St, San Diego", "approved"),
  createData("456456", "Michelle Lopez", "Designer", "789 Pine St, Dallas", "approved"),
  createData("567567", "Jason Perez", "Engineer", "456 Oak St, Phoenix", "approved"),
  createData("678678", "Ashley Turner", "Manager", "987 Elm St, Philadelphia", "approved"),
  createData("789789", "Mark Harris", "Developer", "654 Maple St, Detroit", "approved"),
  createData("890890", "Rachel Moore", "Analyst", "321 Cedar St, Minneapolis", "approved"),
  createData("901901", "Eric Allen", "Designer", "789 Pine St, Charlotte", "approved"),
  createData("012012", "Stephanie King", "Engineer", "456 Oak St, Indianapolis", "rejected"),
  createData("123123", "Andrew Scott", "Manager", "987 Elm St, Columbus", "approved"),
  createData("234234", "Nicole Green", "Developer", "654 Maple St, Memphis", "approved"),
  createData("345345", "Joshua Hill", "Analyst", "321 Cedar St, Nashville", "approved"),
  createData("456456", "Katherine Baker", "Designer", "789 Pine St, Louisville", "approved"),
  createData("567567", "Steven Carter", "Engineer", "456 Oak St, Milwaukee", "approved"),
  createData("678678", "Hannah Torres", "Manager", "987 Elm St, Jacksonville", "approved"),
  createData("789789", "Brandon Morris", "Developer", "654 Maple St, Baltimore", "approved"),
  createData("890890", "Samantha Rivera", "Analyst", "321 Cedar St, Las Vegas", "approved"),
  createData("901901", "Justin Ward", "Designer", "789 Pine St, Salt Lake City", "approved"),
  createData("012012", "Alexis Murphy", "Engineer", "456 Oak St, Kansas City", "approved"),
  createData("123123", "Tyler Price", "Manager", "987 Elm St, Tampa", "approved"),
  createData("234234", "Madison Gray", "Developer", "654 Maple St, Oakland", "approved"),
  createData("345345", "Cameron Hughes", "Analyst", "321 Cedar St, Pittsburgh", "approved"),
  createData("456456", "Vanessa Bell", "Designer", "789 Pine St, Sacramento", "approved"),
  createData("567567", "Gabriel Russell", "Engineer", "456 Oak St, Orlando", "rejected"),
  createData("678678", "Olivia Diaz", "Manager", "987 Elm St, St. Louis", "rejected"),
  createData("789789", "Jacob Coleman", "Developer", "654 Maple St, Austin", "rejected"),
  createData("890890", "Isabella Nelson", "Analyst", "321 Cedar St, San Antonio", "approved"),
  createData("901901", "William Foster", "Designer", "789 Pine St, Houston", "approved"),
];

function TeacherLayout() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("fullname");
  const [order, setOrder] = React.useState("asc");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

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
        // Special case for sorting by number column
        return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      } else {
        // Default sorting logic for other columns
        const comparison = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
        return order === "asc" ? comparison : -comparison;
      }
    };
    return [...rows].sort(comparator);
  }, [rows, orderBy, order]);

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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ textAlign: "center" }}>
                      {column.id !== "number" ? (
                        column.id === "action" ? (
                          <>
                            {row.status === "rejected" ? (
                              <>
                                <Button variant="outlined" color="error">
                                  Rejected
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleOpenModal(row)} sx={{ marginLeft: 1 }}>
                                  View
                                </Button>
                              </>
                            ) : row.status === "approved" ? (
                              <>
                                <Button variant="outlined" color="success">
                                  Approved
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleOpenModal(row)} sx={{ marginLeft: 1 }}>
                                  View
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="contained" color="primary" onClick={() => console.log("Process clicked")}>
                                  Process
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleOpenModal(row)} sx={{ marginLeft: 1 }}>
                                  View
                                </Button>
                              </>
                            )}
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

      {/* Modal for View Details */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 600, minWidth: 300 }}>
          <h2 id="modal-modal-title">Details for {selectedRow && selectedRow.name}</h2>
          <p id="modal-modal-description">
            <strong>NIP:</strong> {selectedRow && selectedRow.NIP}
            <br />
            <strong>Fullname:</strong> {selectedRow && selectedRow.fullname}
            <br />
            <strong>Jabatan:</strong> {selectedRow && selectedRow.jabatan}
            <br />
            <strong>Phone:</strong> {selectedRow && selectedRow.phone}
            <br />
            <strong>Address:</strong> {selectedRow && selectedRow.address}
            <br />
            <strong>Status:</strong> {selectedRow && selectedRow.status}
          </p>
        </Box>
      </Modal>
    </div>
  );
}

export default TeacherLayout;
