import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const ConfirmDelete = ({ open, onClose, memberId, fetchMembers }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`/admin/members/${memberId}`);
            toast.success("Member deleted successfully");
            fetchMembers();
            onClose(); 
        } catch (error) {
            toast.error("Failed to delete member");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className='text-slate-600'>Delete Member</DialogTitle>
            <DialogContent className='flex flex-col'>
                <p>Are you sure you want to delete this member?</p>
            </DialogContent>
            <DialogActions className="mx-4 mb-3">
                <Button onClick={onClose} color='secondary'>
                    Cancel
                </Button>
                <Button onClick={handleDelete} sx={{ bgcolor: "#e2e8f0", color: "#222222" }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDelete;
