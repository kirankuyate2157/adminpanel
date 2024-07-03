import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { IoEye, IoEyeOff } from "react-icons/io5";
// import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerMember } from "../Auth/utils/authApi";

const AddMemberModal = ({ open, onClose, member, fetchMembers }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: "member",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (member) {
      setData({
        ...member,
      });
    } else {
      setData({
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: "member",
        password: "",
        confirmPassword: "",
      });
    }
  }, [member]);

  const nav = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!member) {
      if (!data.email) newErrors.email = "Email is required";
      if (!data.password) newErrors.password = "Password is required";
      if (data.password !== data.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        // toast.error(validationErrors[key]);
        break;
      }
      return;
    }

    try {
      if (member) {
        await axios.patch(`/admin/member/${member._id}`, data);
        // toast.success("Member updated successfully");
      } else {
        await registerMember(data);
        // toast.success("Member added successfully");
      }
      fetchMembers();
      setData({});
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className='text-slate-600'>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
      <DialogContent className='flex flex-col '>
        <div className=' w-full flex flex-col sm:flex-row sm:gap-4'>
          <div className='w-full flex flex-col items-start py-1.5 sm:py-3'>
            <input
              type='text'
              name='firstName'
              className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
              placeholder='First Name'
              onChange={handleChange}
              value={data.firstName}
              required
            />
          </div>
          <div className='w-full flex flex-col items-start py-1.5 sm:py-3'>
            <input
              type='text'
              name='lastName'
              className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
              placeholder='Last Name'
              onChange={handleChange}
              value={data.lastName}
              required
            />
          </div>
        </div>
        <div className={`flex flex-col items-start py-1.5 sm:py-3 ${member ? "opacity-50 cursor-auto" : ""}`} >
          <input
            type='text'
            name='email'
            className='border-solid rounded-md border border-gray-300 w-[100%] p-2'
            placeholder='Email'
            onChange={handleChange}
            value={data.email}
            required
            disabled={member ? true : false}
          />
        </div>
        {!member && (<div className='flex flex-col items-start py-1.5 sm:py-3'>
          <div className='border-solid rounded-md border items-center border-gray-300 w-[100%] p-2 flex'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              className='w-full outline-none'
              placeholder='Password'
              onChange={handleChange}
              value={data.password}
              required={!member}
            />
            {showPassword ? (
              <IoEyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <IoEye onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>)}
        {!member && (<div className='flex flex-col items-start py-1.5 sm:py-3'>
          <div className='border-solid rounded-md border items-center border-gray-300 w-[100%] p-2 flex'>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name='confirmPassword'
              className='w-full outline-none'
              placeholder='Confirm Password'
              onChange={handleChange}
              value={data.confirmPassword}
              required={!member}
            />
            {showConfirmPassword ? (
              <IoEyeOff onClick={() => setShowConfirmPassword(false)} />
            ) : (
              <IoEye onClick={() => setShowConfirmPassword(true)} />
            )}
          </div>{" "}
        </div>)}
      </DialogContent>
      <DialogActions className="mx-4 mb-3">
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={{ bgcolor: "#e2e8f0", color: "#222222" }}>
          {member ? "Update Member" : "Add Member"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberModal;
