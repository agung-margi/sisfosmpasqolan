import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { FaTrash, FaEye, FaBackspace, FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../axiosConfig";
import TokenContext from "../../components/data/AuthTokenContext";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 100 },
  { id: "fullName", label: "Nama", minWidth: 100 },
  { id: "schoolFrom", label: "Asal Sekolah", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

const createData = (id, fullName, placeOfBirth, dateOfBirth, schoolFrom, address, phoneNumber, status, images, userId) => ({
  id,
  fullName,
  placeOfBirth,
  dateOfBirth,
  schoolFrom,
  address,
  phoneNumber,
  status,
  images,
  userId,
});

function PPDBLayout() {
  const { tokenInfo } = useContext(TokenContext);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("fullName");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [detailStudent, setDetailStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [disabledActions, setDisabledActions] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("/students", {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      const students = response.data.students.map((student) =>
        createData(
          student.id,
          student.fullName,
          student.placeOfBirth,
          student.dateOfBirth,
          student.schoolFrom,
          student.address,
          student.phoneNumber,
          student.status,
          student.images,
          student.userId
        )
      );
      setRows(students);
      const disabledStatus = {};
      students.forEach((student) => {
        if (student.status === "Approved") {
          disabledStatus[student.id] = true;
        }
      });
      setDisabledActions(disabledStatus);
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
    setDetailStudent(row);
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
      if (orderBy === "number")
        return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      const comparison = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
      return order === "asc" ? comparison : -comparison;
    };
    return [...rows].sort(comparator);
  }, [rows, orderBy, order]);

  const onProcessAction = async (student, action) => {
    try {
      const endpoint = `/student/${student.userId}/${action}`;
      await axios.put(endpoint, null, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      fetchData();
      if (action === "approved") {
        setDisabledActions((prev) => ({ ...prev, [student.id]: true }));
      }
      toast.info(`Student ${action}d successfully!`);
    } catch (error) {
      toast.error(
        `Failed to ${action} student: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setOpenConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/student/${studentToDelete.userId}`, {
        headers: { Authorization: `Bearer ${tokenInfo.token}` },
      });
      toast.success("Student deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error(
        `Failed to delete student: ${error.response ? error.response.data.message : error.message}`
      );
    } finally {
      setOpenConfirmModal(false);
      setStudentToDelete(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teacher-layout">
      <ToastContainer />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, textAlign: "center" }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={row.id}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ textAlign: "center" }}
                      >
                        {column.id === "number"
                          ? index + 1
                          : column.id === "action"
                            ? <>
                              <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleOpenModal(row)}
                                sx={{ marginLeft: 1 }}
                                style={{ minWidth: "30px", padding: "6px" }}
                              >
                                <FaEye />
                              </Button>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => onProcessAction(row, "approved")}
                                sx={{ marginLeft: 1 }}
                                style={{ minWidth: "30px", padding: "6px" }}
                                disabled={disabledActions[row.id]}
                              >
                                <FaCheck />
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => onProcessAction(row, "reject")}
                                sx={{ marginLeft: 1 }}
                                style={{ minWidth: "30px", padding: "6px" }}
                                disabled={disabledActions[row.id]}
                              >
                                <FaBackspace />
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(row)}
                                sx={{ marginLeft: 1 }}
                                style={{ minWidth: "30px", padding: "6px" }}
                              >
                                <FaTrash />
                              </Button>
                            </>
                            : row[column.id]}
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 500,
            width: "90%",
          }}
        >
          {detailStudent && (
            <div>
              <h2 className="text-xl font-bold text-center mb-4">
                Detail Siswa
              </h2>
              <div className="flex justify-center mb-4">
                <img
                  src={detailStudent.images[0].imageUrl}
                  alt="Foto Profil"
                  className="rounded-md h-40 w-40 border border-gray-300"
                />
              </div>
              <table className="mt-5 border mx-auto">
                <tbody>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">ID</td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.id}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Nama Lengkap
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Tempat Lahir
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.placeOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Tanggal Lahir
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Asal Sekolah
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.schoolFrom}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Alamat Lengkap
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">
                      Nomor Handphone
                    </td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 px-4 py-2 text-left">Status</td>
                    <td className="border-2 px-4 py-2 text-left">
                      {detailStudent.status}
                    </td>
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            minWidth: 300,
          }}
        >
          <h2 className="font-bold text-xl mb-4">Konfirmasi Penghapusan</h2>
          <p>Apakah Anda yakin ingin menghapus siswa ini?</p>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDelete}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenConfirmModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PPDBLayout;
