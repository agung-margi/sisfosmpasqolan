import React from 'react'
import axios from '../../axiosConfig'
import { Link } from 'react-router-dom'
import { FaEye, FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination } from '@mui/material'
import { IoMdClose } from 'react-icons/io'
import { useState, useEffect } from 'react'

const columns = [
    {id: "number", label: "No", minWidth: 50},
    {id: "extraName", label: "Nama", minWidth: 100, align: "center"},
    {id: "catagory", label: "Katagori", minWidth: 70, align: "center"},
    {id: "shortDesc", label: "Deskripsi", minWidth: 200, align: "center"},
    {id: "meetingDays", label: "Jadwal", minWidth: 100, align: "center"},
    {id: "coach", label: "Coach", minWidth: 100, align: "center"},
    {id: "action", label: "Aksi", minWidth: 100, align: "center"},
]

export default function Ekskul() {
    const [ekskul, setEkskul] = useState([])
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [pageRow, setRowPage] = useState(3)
    const [total, setTotal] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [orderBy, setOrderBy] = useState("extraName")
    const [order, setOrder] = useState("asc")
    const [openModal, setOpenModal] = useState(false)
    const [selectedRow,setSelectedRow] = useState(null)
  
    const getEkskul = async() => {
      try{
        const res = await axios.get("http://localhost:3000/api/ekskuls", {
          params: {
            page : page + 1,
            limit : pageRow
          }
        })
        const ekskulData = res.data.data
        console.log(ekskulData)
        setEkskul(ekskulData)
        setTotal(res.data.paginationMetadata.ekskultotal)
      }catch(err){
        setError(err.message)
      }
    }
  
    useEffect(() => {
      getEkskul()
    }, [page, pageRow])
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowPage(+event.target.value)
      setPage(0)
    }
  
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
  
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
      // Implement search functionality here (filtering teachers based on searchQuery)
    };
  
    const handleOpenModal = (row) => {
      setSelectedRow(row)
      setOpenModal(true)
    }
  
    const handleCloseModal = () => {
      setOpenModal(false)
    }
  
    console.log(ekskul)
  
    return (
      <div>
        <div className="flex flex-row mx-12 my-5 mb-8">
          <div className="grow">
            <Button component={Link} to="/ekskul/add" variant="contained" color="primary" startIcon={<FaPlus/>} size="large">
              Add Ekskul
            </Button>
          </div>
          <div className="relative">
            <input type="search" placeholder="Search" className="border rounded p-2 pl-10 w-56 focus:outline-0 focus:drop-shadow-md" value={searchQuery} onChange={handleInputChange}/>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch/>
            </div>
          </div>
        </div>
  
        <div className="mx-10">
          <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer sx={{maxHeight: 720}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell key={col.id} align={col.align} style={{minWidth: col.minWidth, fontWeight: "bold", textAlign: "center"}}>
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
                          <TableCell key={col.id} align={col.align} style={{textAlign : "justify"}}>
                            {col.id !== "number" ? (
                              col.id === "action" ? (
                                <>
                                <Button variant='contained' color='warning' sx={{marginTop: 1, marginLeft:0.5}} style={{minWidth : "40px", padding: "8px"}} component={Link} to={`/teacher/edit/${row.NIP}`}>
                                  <FaPen/>
                                </Button>
                                <Button variant='contained' color='info' sx={{marginTop: 1, marginLeft: 0.5}} style={{minWidth : "40px", padding: "8px"}} onClick={() => handleOpenModal(row)}>
                                  <FaEye/>
                                </Button>
                                <Button variant='contained' color='error' sx={{marginTop: 1, marginLeft: 0.5}} style={{minWidth : "40px", padding: "8px"}} component={Link} to={`/teacher/edit/${row.NIP}`}>
                                  <FaTrash/>
                                </Button>
                                </>
                              ) : col.format && typeof row
                              [col.id] === "number" ? (
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
                      <TableCell colSpan={columns.length} align='center'>
                        No data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 6, 9]}
              component="div"
              count={total}
              rowsPerPage={pageRow}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
  
          <Modal open={openModal} onClose={handleCloseModal}
            aria-labelledby="modal-ekskul-detail"
            aria-describedby="modal-modal-description">
              <Box sx={{position: "absolute", top: "30%", left: "20%",  transform: "translate(-10%, -30%)", bgcolor: "white", boxShadow: 24, p: 4, maxWidth:1120, minWidth: 600, borderRadius: "10px"}}>
                <p className='font-bold text-xl mb-4'>
                  Detail Ekskul {selectedRow && selectedRow.extraName}
                </p>
                <div className='flex justify-end'>
                  <Button
                    aria-label='close'
                    onClick={handleCloseModal}
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                      color: "black",
                      borderRadius: "5px",
                      "&:hover": { color: "black", backgroundColor: "darkgray" },
                    }}>
                      <IoMdClose size={24}/>
                    </Button>
                </div>
                <div className='flex flex-col items-center justify-center mb-5'>
                <table className="mt-5 border">
                  <tbody>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Name</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.extraName}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Katagori</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.catagory}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Deskripsi</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.fullDesc}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Jadwal Pertemuan</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.meetingDays}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Coach</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.coach}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Lokasi Ekskul</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.location}</td>
                    </tr>
                    <tr>
                      <td className="border-2 px-4 py-1 text-left text-sm font-bold">Informasi Kontak</td>
                      <td className="border-2 px-4 py-1 text-left text-sm">{selectedRow && selectedRow.contactInfo}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </Box>
          </Modal>
        </div>
      </div>
    )
}
