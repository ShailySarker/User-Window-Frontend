import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUser, fetchUsers } from '../../../redux/apis/userApi';
import { setPage } from '../../../redux/slices/usersSlice';
import UserCard from './UserCard';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, page, totalPages, status, error } = useSelector((state) => state?.users);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(users)
    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setPage(newPage));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };

    const filteredUsers = users?.filter(
        (user) =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading' && page === 1) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    }
    return (
        <div className="mx-auto xl:px-10 lg:px-8 md:px-6 px-4 lg:py-8 md:py-5 py-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="xl:text-2xl/none lg:text-xl/none text-lg/normal font-bold">Users</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 lg:py-2 py-[6px] border rounded-md shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers?.map((user) => (
                    <UserCard
                        key={user?.id}
                        user={user}
                        onEdit={() => navigate(`/users/edit/${user?.id}`)}
                        onDelete={() => handleDelete(user?.id)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <nav className="inline-flex rounded-md shadow">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-4 py-2 border-t border-b border-gray-300 ${page === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default UserList;