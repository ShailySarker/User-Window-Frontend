import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUser, fetchUsers } from '../../../redux/apis/userApi';
import { setPage } from '../../../redux/slices/usersSlice';
import UserCard from './UserCard';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        data: users,
        page: currentPage,
        per_page: perPage,
        total: totalUsers,
        status,
        error
    } = useSelector((state) => state.users);

    const [searchTerm, setSearchTerm] = useState('');
    const [localPage, setLocalPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / perPage);

    // Fetch users when page changes
    useEffect(() => {
        dispatch(fetchUsers(localPage));
    }, [dispatch, localPage]);

    // Sync local page with Redux page
    useEffect(() => {
        if (currentPage !== localPage) {
            setLocalPage(currentPage);
        }
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setLocalPage(newPage);
            dispatch(setPage(newPage));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Filter users based on search term
    const filteredUsers = users?.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };

    if (status === 'loading') return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;


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
            {/* User Grid */}
            {filteredUsers?.length === 0 ? (
                <div className="text-center xl:py-40 lg:py-28 md:py-56 py-36 text-gray-500 font-medium md:text-base text-sm">
                    No users found matching your search
                </div>
            ) : (
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
            )}
            {/* /* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <nav className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(localPage - 1)}
                            disabled={localPage === 1}
                            className="px-4 md:py-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-base/none"
                            aria-label="Previous page"
                        >
                            <FaArrowLeftLong /> Prev
                        </button>

                        {/* First page */}
                        {localPage > 3 && (
                            <>
                                <button
                                    onClick={() => handlePageChange(1)}
                                    className={`px-4 md:py-3 py-2 text-base/none rounded-md border ${localPage === 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'}`}
                                >
                                    1
                                </button>
                                {localPage > 4 && (
                                    <span className="px-2">...</span>
                                )}
                            </>
                        )}

                        {/* Middle pages */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (localPage <= 3) {
                                pageNum = i + 1;
                            } else if (localPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = localPage - 2 + i;
                            }

                            if (pageNum < 1 || pageNum > totalPages) return null;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-4 md:py-3 py-2 rounded-md text-base/none border ${localPage === pageNum ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Last page */}
                        {localPage < totalPages - 2 && (
                            <>
                                {localPage < totalPages - 3 && (
                                    <span className="px-2">...</span>
                                )}
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    className={`px-4 md:py-3 py-2 rounded-md border ${localPage === totalPages ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'}`}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => handlePageChange(localPage + 1)}
                            disabled={localPage === totalPages}
                            className="px-4 md:py-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed  flex items-center gap-2 text-base/none"
                            aria-label="Next page"
                        >
                            Next <FaArrowRightLong />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default UserList;