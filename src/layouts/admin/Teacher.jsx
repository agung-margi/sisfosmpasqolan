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
import axios from "axios";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "NIP", label: "NIP", minWidth: 170 },
  { id: "fullName", label: "Nama Lengkap", minWidth: 100 },
  {
    id: "position",
    label: "Jabatan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
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

function TeacherLayout() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("fullName");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  const startNumber = page * rowsPerPage + 1;

  // Pada getAllTeachers di frontend
  const getAllTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/teachers", {
        params: {
          page: page + 1, // Perhatikan pengaturan di sini untuk menyesuaikan dengan halaman yang dimulai dari 0 di frontend
          limit: rowsPerPage,
        },
      });
      const responseData = response.data.data;
      setTeachers(responseData);
      setTotalCount(response.data.paginationMetadata.totalCount);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllTeachers();
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
    // Implement search functionality here (filtering teachers based on searchQuery)
  };

  return (
    <div>
      <div className="flex flex-row mx-12 my-5 mb-8">
        <div style={{ flexGrow: 1 }}>
          <Button component={Link} to="/teacher/add" variant="contained" color="primary" startIcon={<FaPlus />} size="large">
            Add Teacher
          </Button>
        </div>
        <div className="relative">
          <input type="search" placeholder="   Search" className="border rounded p-2 pl-10 w-56 focus:outline-0 focus:drop-shadow-md" value={searchQuery} onChange={handleInputChange} />
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
                {teachers && teachers.length > 0 ? (
                  teachers.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.NIP}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ textAlign: "center" }}>
                          {column.id !== "number" ? (
                            column.id === "action" ? (
                              <>
                                <Button variant="contained" color="warning" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} component={Link} to={`/teacher/edit/${row.NIP}`}>
                                  <FaPen />
                                </Button>
                                <Button variant="contained" color="info" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} onClick={() => handleOpenModal(row)}>
                                  <FaEye />
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} onClick={() => handleOpenModal(row)}>
                                  <FaTrash />
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
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-teacher-details" aria-describedby="modal-modal-description" BackdropProps={{ onClick: () => {} }}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 1080, minWidth: 600, borderRadius: "10px" }}>
            <h2 className="font-bold text-2xl mb-8">Teacher Details {selectedRow && selectedRow.name}</h2>
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
              <img src="https://res.cloudinary.com/dnhxlvlmi/image/upload/v1718810700/zamqjujsnqmgswegy432.png" alt="Foto profil" className=" h-44 border rounded-sm shadow-lg p-4" />
              <table className="mt-5 border">
                <tbody>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">NIP</td>
                    <td className="border-2 px-4 py-2 text-left">{selectedRow && selectedRow.NIP}</td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">Nama Lengkap</td>
                    <td className="border-2 px-4 py-2 text-left">{selectedRow && selectedRow.fullName}</td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">Alamat Lengkap</td>
                    <td className="border-2 px-4 py-2 text-left">{selectedRow && selectedRow.email}</td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">Jabatan</td>
                    <td className="border-2 px-4 py-2 text-left">{selectedRow && selectedRow.position}</td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">Status</td>
                    <td className="border-2 px-4 py-2 text-left">{selectedRow && selectedRow.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TeacherLayout;
