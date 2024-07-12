import React, { useContext, useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { FaPen, FaTrash, FaEye, FaSearch, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "../../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import TokenContext from "../../components/data/AuthTokenContext";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "NIP", label: "NIP", minWidth: 170 },
  { id: "fullName", label: "Nama Lengkap", minWidth: 100 },
  { id: "position", label: "Jabatan", minWidth: 100, align: "right" },
  { id: "address", label: "Alamat", minWidth: 100, align: "right" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

function TeacherLayout() {
  const { tokenInfo, refreshToken } = useContext(TokenContext);
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
  const [loading, setLoading] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  useEffect(() => {
    refreshToken();
    getAllTeachers();
  }, [page, rowsPerPage]);

  const startNumber = page * rowsPerPage + 1;

  const getAllTeachers = async () => {
    try {
      const response = await axios.get("teachers", {
        params: { page: page + 1, limit: rowsPerPage },
      });
      setTeachers(response.data.data.data);
      setTotalCount(response.data.paginationMetadata.totalCount);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    setTeacherToDelete(id);
    setOpenConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/teacher/${teacherToDelete}`, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });

      console.log("Delete response:", response.data);

      if (response.data.success) {
        toast.success("Teacher deleted successfully!");
        getAllTeachers();
      } else {
        toast.error(response.data.message || "Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete teacher: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setOpenConfirmModal(false);
      setTeacherToDelete(null);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = async (row) => {
    setSelectedRow({
      ...row,
      image: row.image && row.image.length > 0 ? row.image[0].image : null,
    });
    setOpenModal(true);
    await fetchTeacherDetails(row.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTeacherDetails(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchTeacherDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/teacher/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Teacher not found");
      }
      setTeacherDetails(response.data.data);
    } catch (error) {
      setError(error.message || "Failed to fetch teacher details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
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
                                <Button variant="contained" color="warning" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} component={Link} to={`/teacher/edit/${row.id}`}>
                                  <FaPen />
                                </Button>
                                <Button variant="contained" color="info" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} onClick={() => handleOpenModal(row)}>
                                  <FaEye />
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginLeft: 1 }} style={{ minWidth: "30px", padding: "6px" }} onClick={() => handleDelete(row.id)}>
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
          <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={totalCount} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>

        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-teacher-details" aria-describedby="modal-modal-description">
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 1080, minWidth: 600, borderRadius: "10px" }}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {teacherDetails && (
              <div className="justify-center">
                <h2 className="font-bold text-2xl mb-8 text-center">{teacherDetails.fullName}</h2>
                <div className="flex justify-center mb-4">
                  <img src={teacherDetails.image} alt="Foto Profil" className="rounded-md h-40 w-40 border border-gray-300" />
                </div>
                <table className="mt-5 border mx-auto">
                  <tbody>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">NIP</td>
                      <td className="border-2 px-4 py-2 text-left">{teacherDetails.NIP}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Nama Lengkap</td>
                      <td className="border-2 px-4 py-2 text-left">{teacherDetails.fullName}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Alamat Lengkap</td>
                      <td className="border-2 px-4 py-2 text-left">{teacherDetails.address}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Jabatan</td>
                      <td className="border-2 px-4 py-2 text-left">{teacherDetails.position}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Subjects</td>
                      <td className="border-2 px-4 py-2 text-left">{teacherDetails.subjects}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
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
                <IoMdClose size={20} />
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
          <Box sx={{ ...modalStyles }}>
            <h2 className="font-bold text-xl">Confirm Delete</h2>
            <p className="text-md mt-4 mb-6">Apakah anda akan menghapus data ini?</p>
            <div className="flex justify-end">
              <Button variant="contained" color="error" onClick={confirmDelete}>
                Delete
              </Button>
              <Button variant="contained" onClick={() => setOpenConfirmModal(false)} sx={{ marginLeft: 2 }}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TeacherLayout;
