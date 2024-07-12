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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaTrash, FaEye, FaSearch, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "../../axiosConfig"; // Adjust this import according to your axios configuration

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 170 },
  { id: "fullName", label: "Nama Lengkap", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "right",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

function UserLayout() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("fullname");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  const startNumber = page * rowsPerPage + 1;

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get("/get-all-user", {
        params: {
          page: page + 1, // Adjust page index for backend
          limit: rowsPerPage,
        },
      });
      const responseData = response.data.data;
      console.log(responseData)
      setUsers(responseData.data);
      setTotalCount(response.data.paginationMetadata.totalCount);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Implement search functionality here (filtering users based on searchQuery)
  };

  return (
    <div>
      <div className="flex flex-row mx-12 my-5 mb-8">
        <div style={{ flexGrow: 1 }}>
          <Button component={Link} to="/user/add" variant="contained" color="primary" startIcon={<FaPlus />} size="large">
            Add User
          </Button>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="   Search"
            className="border rounded p-2 pl-10 w-56 focus:outline-0 focus:drop-shadow-md"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch />
          </div>
        </div>
      </div>

      <div className="mx-10">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 720 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold", textAlign: "center" }}
                    >
                      {column.id !== "number" ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleRequestSort(column.id)}
                        >
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
                {users && users.length > 0 ? (
                  users.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ textAlign: "center" }}>
                          {column.id !== "number" ? (
                            column.id === "action" ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  sx={{ marginLeft: 1 }}
                                  style={{ minWidth: "30px", padding: "6px" }}
                                  component={Link}
                                  to={`/user/edit/${row.id}`}
                                >
                                  <FaPen />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="info"
                                  sx={{ marginLeft: 1 }}
                                  style={{ minWidth: "30px", padding: "6px" }}
                                  onClick={() => handleOpenModal(row)}
                                >
                                  <FaEye />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{ marginLeft: 1 }}
                                  style={{ minWidth: "30px", padding: "6px" }}
                                  onClick={() => handleOpenModal(row)}
                                >
                                  <FaTrash />
                                </Button>
                              </>
                            ) : (
                              row[column.id]
                            )
                          ) : (
                            index + 1
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalCount} // Menggunakan totalCount untuk paginasi
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Modal for View Details */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-user-details"
          aria-describedby="modal-modal-description"
          BackdropProps={{ onClick: () => { } }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: 1080,
              minWidth: 600,
              borderRadius: "10px",
            }}
          >
            <h2 className="font-bold text-2xl mb-8">User Details {selectedRow && selectedRow.name}</h2>
            <div className="flex justify-end">
              <Button
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "8px",
                  color: "black",
                  borderRadius: "5px",
                  "&:hover": { color: "black", backgroundColor: "darkgray" },
                }}
              >
                <IoMdClose size={24} />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mb-10">
              <img
                src={selectedRow && selectedRow.imageUrl}
                alt="Foto profil"
                className="w-48 h-48 rounded-full mb-4 object-cover shadow-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>ID:</strong> {selectedRow && selectedRow.id}
                  </p>
                  <p>
                    <strong>Nama:</strong> {selectedRow && selectedRow.fullname}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedRow && selectedRow.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedRow && selectedRow.role}
                  </p>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default UserLayout;
