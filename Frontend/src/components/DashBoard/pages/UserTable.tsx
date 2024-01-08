import { Button, Table } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiClientPrivate } from '../../../utils/axios';
import { useState } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  _id: string;
  username: string;
  email: string;
}

const UserTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, isLoading, isError } = useQuery<User[], Error>('users', async () => {
    try {
      const response = await ApiClientPrivate.get<User[]>('/users');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  });

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation(
    (id: string) => ApiClientPrivate.delete(`/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleBlock = async (id: string) => {
    try {
      await ApiClientPrivate.put(`/users/block/${id}`);
      queryClient.invalidateQueries('users');
      toast.success('User blocked successfully');
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user');
    }
  };

  const navigate = useNavigate();
  const handleHomeButton = () => {
    navigate('/');
  };

  const handleDashBoardHome = () => {
    navigate('/DashBoard');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: User) => (
        <div className='flex gap-3'>
          <Button className='bg-yellow-500 text-balck' onClick={() => handleBlock(record._id)}>
            Block
          </Button>
          <Button className='bg-red-600 text-white' onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='m-3 rounded-lg bg-blue-300 border shadow-gray-500 shadow-md'>
      <div className='mt-3 ml-3 font-bold flex items-center justify-between mr-5'>
        <h2 className='p-3 flex items-center gap-3'>
          User Table <FaUser />
        </h2>
        <div className='flex justify-center my-3 '>
        <input
          type='text'
          placeholder='Search by name or email'
          value={searchQuery}
          onChange={handleSearch}
          className='p-2 border rounded-md w-80 font-normal'
        />
      </div>
        <div className='flex gap-5'>
          <p
            className='border border-black rounded-full w-[50px] h-[50px] flex items-center justify-center text-[22px] text-black '
            onClick={handleHomeButton}
          >
            <FaHome size={25} />
          </p>
          <p
            className='border border-black rounded-full w-[50px] h-[50px] flex items-center justify-center text-[22px] text-black '
            onClick={handleDashBoardHome}
          >
            <MdDashboardCustomize size={25} />
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <Table columns={columns} dataSource={filteredUsers ? filteredUsers : users} className='p-2 w-full' rowKey='_id' />
      )}
      <ToastContainer />
    </div>
  );
};

export default UserTable;
