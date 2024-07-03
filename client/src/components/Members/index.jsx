import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomSearchBar from '../CustomSearchBar';
import { Button } from "@mui/material";
import MemberTable from './MemberTable';
import AddMemberModal from './AddMemberModal';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 1,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/admin/members', {
        params: {
          page,
          limit,
          query: search,
        },
      });
      setMembers(response.data.data.members);
      setPagination(response.data.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, search]);

  console.log("member data : ", members)

  return (
    <div>
      <div className='flex flex-col md:p-[2rem] mb-[4rem] md:mb-0 p-2 w-[100%]'>
        <AddMemberModal open={isModalOpen} onClose={handleCloseModal} />
        <div className='relative w-full flex md:flex-row md:justify-between flex-col md:items-center'>
          <p className='text-[150%] font-bold'>Members</p>
          <div className='flex flex-row w-full h-10 my-3 justify-between md:justify-end items-center gap-2'>
            <CustomSearchBar
              className='!w-[9rem] md:!w-64 h-9 text-gray-700'
              placeholder='Search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to the first page when search changes
              }}
            />
            <Button
              sx={{ bgcolor: "#e2e8f0", color: "#222222" }}
              onClick={handleOpenModal}
            >
              Add New User
            </Button>
          </div>
        </div>
        <MemberTable members={members} pagination={pagination} setPage={setPage} />
      </div>
    </div>
  );
};

export default Members;
