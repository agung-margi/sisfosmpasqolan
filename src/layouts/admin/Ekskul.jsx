import React from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";

const columns = [
  { id: "number", label: "No", minWidth: 50 },
  { id: "extraName", label: "Nama", minWidth: 100, align: "center" },
  { id: "category", label: "Kategori", minWidth: 70, align: "center" }, // Perbaikan typo dari "catagory" menjadi "category"
  { id: "shortDesc", label: "Deskripsi", minWidth: 200, align: "center" },
  { id: "meetingDays", label: "Jadwal", minWidth: 100, align: "center" },
  { id: "coach", label: "Coach", minWidth: 100, align: "center" },
  { id: "action", label: "Aksi", minWidth: 100, align: "center" },
];

export default function Ekskul() {
  const [ekskul, setEkskul] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageRow, setRowPage] = useState(3);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("extraName");
  const [order, setOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ekskulDetails, setEkskulDetails] = useState(null);

  useEffect(() => {
    getEkskul();
  }, [page, pageRow]);

  const getEkskul = async () => {
    try {
      const res = await axios.get("/ekskuls", {
        params: {
          page: page + 1,
          limit: pageRow,
        },
      });
      const ekskulData = res.data.data;
      setEkskul(ekskulData);
      setTotal(res.data.paginationMetadata.ekskultotal);
    } catch (err) {
      setError(err.message);
    }
  };

  const getEkskulDetails = async (id) => {
    try {
      console.log("id", id);
      const response = await axios.get(`/ekskul/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("res", response); // Logging response untuk debugging
      console.log("Detail ekskul:", response.data.data); // Perbaikan disini, gunakan response.data.data
      setEkskulDetails(response.data.data);
      setOpenModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenModal = async (row) => {
    setSelectedRow({
      ...row,
      image: row.image && row.image.length > 0 ? row.image[0].image : null,
    });
    await getEkskulDetails(row.id); // Memanggil fungsi untuk mendapatkan detail ekskul berdasarkan ID saat membuka modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (id) => {
    console.log(`Edit ekskul with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting ekskul with ID:", id);
      const res = await axios.delete(`/ekskul/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Delete response:", res.data);

      setEkskul(ekskul.filter((item) => item.id !== id));

      setTotal(total - 1);

      if (ekskul.length === 1 && page > 0) {
        setPage(page - 1);
      }

      getEkskul();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
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
                {ekskul && ekskul.length > 0 ? (
                  ekskul?.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((col) => (
                        <TableCell key={col.id} align={col.align} style={{ textAlign: "justify" }}>
                          {col.id !== "number" ? (
                            col.id === "action" ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  sx={{ marginTop: 1, marginLeft: 0.5 }}
                                  style={{ minWidth: "40px", padding: "8px" }}
                                  component={Link}
                                  to={`/ekskul/edit/${row.id}`}
                                  onClick={() => handleEdit(row.id)}
                                >
                                  <FaPen />
                                </Button>
                                <Button variant="contained" color="info" sx={{ marginTop: 1, marginLeft: 0.5 }} style={{ minWidth: "40px", padding: "8px" }} onClick={() => handleOpenModal(row)}>
                                  <FaEye />
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginTop: 1, marginLeft: 0.5 }} style={{ minWidth: "40px", padding: "8px" }} onClick={() => handleDelete(row.id)}>
                                  <FaTrash />
                                </Button>
                              </>
                            ) : col.format && typeof row[col.id] === "number" ? (
                              col.format(row[col.id])
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
                      No data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[3, 6, 9]} component="div" count={total} rowsPerPage={pageRow} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>

        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-ekskul-detail" aria-describedby="modal-modal-description">
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 1080, minWidth: 600, borderRadius: "10px" }}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {ekskulDetails && (
              <div className="justify-center">
                <h2 className="font-bold text-2xl mb-8 text-center">{ekskulDetails.extraName}</h2>
                <table className="mt-5 border mx-auto">
                  <tbody>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Nama</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.extraName}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Kategori</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.category}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Deskripsi</td>
                      <td className="border-2 px-4 py-2 text-left">{ekskulDetails.shortDesc}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-2 text-left">Jadwal</td>
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
      </div>
    </div>
  );
}
