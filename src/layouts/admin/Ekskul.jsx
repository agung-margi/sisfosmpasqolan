import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import axios from "../../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import TokenContext from "../../components/data/AuthTokenContext";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "extraName", label: "Nama", minWidth: 100, align: "center" },
  { id: "category", label: "Kategori", minWidth: 70, align: "center" },
  { id: "shortDesc", label: "Deskripsi", minWidth: 200, align: "center" },
  { id: "meetingDays", label: "Jadwal", minWidth: 100, align: "center" },
  { id: "coach", label: "Coach", minWidth: 100, align: "center" },
  { id: "action", label: "Aksi", minWidth: 100, align: "center" },
];

export default function Ekskul() {
  const { tokenInfo, refreshToken } = useContext(TokenContext);
  const [ekskul, setEkskul] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("extraName");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ekskulDetails, setEkskulDetails] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [ekskulToDelete, setEkskulToDelete] = useState(null);
  const navigate = useNavigate();

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
    getEkskul();
  }, [page, rowsPerPage]);

  const getEkskul = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await axios.get("/ekskuls", {
        params: { page: page + 1, limit: rowsPerPage },
      });
      setEkskul(response.data.data);
      setTotal(response.data.paginationMetaData.ekskulTotal); // Use correct key
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = async (row) => {
    setSelectedRow(row);
    await getEkskulDetails(row.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEkskulDetails(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getEkskulDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/ekskul/${id}`, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      setEkskulDetails(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setEkskulToDelete(id);
    setOpenConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/ekskul/${ekskulToDelete}`, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      if (response.data.success) {
        toast.success("Ekskul deleted successfully!");
        navigate("/ekskul");
      } else {
        toast.error(response.data.message || "Failed to delete ekskul.");
      }
    } catch (error) {
      toast.error(`Failed to delete ekskul: ${error.message}`);
    } finally {
      setOpenConfirmModal(false);
      setEkskulToDelete(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row mx-12 my-5 mb-8">
        <div className="grow">
          <Button component={Link} to="/ekskul/add" variant="contained" color="primary" startIcon={<FaPlus />} size="large">
            Add Ekskul
          </Button>
        </div>
        <div className="relative">
          <input type="search" placeholder="Search" className="border rounded p-2 pl-10 w-56 focus:outline-0 focus:drop-shadow-md" value={searchQuery} onChange={handleInputChange} />
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
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align} style={{ minWidth: col.minWidth, fontWeight: "bold", textAlign: "center" }}>
                      {col.id !== "number" ? (
                        <TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleRequestSort(col.id)}>
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        <span>{col.label}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {ekskul.length > 0 ? (
                  ekskul.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((col) => (
                        <TableCell key={col.id} align={col.align} style={{ textAlign: "justify" }}>
                          {col.id !== "number" ? (
                            col.id === "action" ? (
                              <>
                                <Button variant="contained" color="warning" sx={{ marginTop: 1, marginLeft: 0.5 }} style={{ minWidth: "40px", padding: "8px" }} component={Link} to={`/ekskul/edit/${row.id}`}>
                                  <FaPen />
                                </Button>
                                <Button variant="contained" color="info" sx={{ marginTop: 1, marginLeft: 0.5 }} style={{ minWidth: "40px", padding: "8px" }} onClick={() => handleOpenModal(row)}>
                                  <FaEye />
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginTop: 1, marginLeft: 0.5 }} style={{ minWidth: "40px", padding: "8px" }} onClick={() => handleDelete(row.id)}>
                                  <FaTrash />
                                </Button>
                              </>
                            ) : (
                              row[col.id]
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
          <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={total} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>

        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-teacher-details" aria-describedby="modal-modal-description">
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 1080, minWidth: 600, borderRadius: "10px" }}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {ekskulDetails && (
              <div className="justify-center">
                <h2 className="font-bold text-2xl mb-8 text-center">{ekskulDetails.fullName}</h2>
                <table className="mt-5 border mx-auto">
                  <tbody>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Nama Ekskul</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.extraName}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Category Ekskul</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.category}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Description</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.fullDesc}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Meeting Days</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.meetingDays}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Coach</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.coach}</td>
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

        <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-description">
          <Box sx={modalStyles}>
            <h2 className="text-lg font-semibold" id="confirm-delete-title">
              Konfirmasi Penghapusan
            </h2>
            <p id="confirm-delete-description">Apakah Anda yakin ingin menghapus ekskul ini?</p>
            <div className="flex justify-end mt-4">
              <Button variant="contained" color="error" onClick={confirmDelete}>
                Hapus
              </Button>
              <Button variant="contained" color="primary" onClick={() => setOpenConfirmModal(false)} className="ml-2">
                Batal
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
