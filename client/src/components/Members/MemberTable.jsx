import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { IconButton, ButtonBase } from "@mui/material";

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
import { columns } from "./constant/columns";

const MemberTable = () => {
    const nav = useNavigate();
    const [rows, setRows] = useState([])
    
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: { xs: 440, md: 550 } }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    // align={column.align}
                                    style={{
                                        // minWidth: column.minWidth,
                                        backgroundColor: "white",
                                        color: "gray",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}>
                                    {column}
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row._id}
                                            component={ButtonBase}
                                        >
                                            <TableCell
                                                align='left'
                                                sx={{ fontWeight: "600" }}
                                            >
                                                {row._id.slice(-6)}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                            >
                                                {row.firstName}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                            >
                                                {row.lastName}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                            >
                                                {row.email}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                            >
                                                {row.password}
                                            </TableCell>


                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default MemberTable;
