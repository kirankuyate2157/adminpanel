import React, { useState } from "react";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { columns } from "./constant/columns"; // Assuming this imports the column headers
import ConfirmDelete from "./ConfirmDelete";

const MemberTable = ({ members, pagination, fetchMembers, setPage, handleEdit, handleDelete }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);

    const handlePageChange = (event, newPage) => {
        setPage(newPage + 1); // Adjust because MUI TablePagination is zero-based
    };

    const handleOpenDeleteModal = (memberId) => {
        setSelectedMemberId(memberId);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedMemberId(null);
        setDeleteModalOpen(false);
    };

    return (<>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: { xs: 440, md: 550 } }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    style={{
                                        backgroundColor: "white",
                                        color: "gray",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members &&
                            members.map((row) => (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row._id}

                                >
                                    <TableCell align='left' sx={{ fontWeight: "600" }}>
                                        {row._id.slice(-6)}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.lastName}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.email}
                                    </TableCell>
                                    <TableCell align='left' className="font-bold">
                                        {"***********"}
                                    </TableCell>
                                    <TableCell align='center' >
                                        <div className="flex text-lg justify-center gap-2">
                                            <MdOutlineModeEdit onClick={() => handleEdit(row)} />
                                            <MdDelete onClick={() => handleOpenDeleteModal(row._id)} />
                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={pagination.totalItems}
                page={pagination.currentPage - 1}
                onPageChange={handlePageChange}
                rowsPerPage={pagination.itemsPerPage}
                rowsPerPageOptions={[pagination.itemsPerPage]}
            />

        </Paper>
        <ConfirmDelete
            open={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            memberId={selectedMemberId}
            fetchMembers={fetchMembers}
        /></>
    );
};

export default MemberTable;
