import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUser, fetchUsers } from '../../../redux/apis/userApi';
import { setPage } from '../../../redux/slices/usersSlice';
import UserCard from './UserCard';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        data: users,
        page: currentPage,
        per_page: perPage,
        total: totalUsers,
        status,
        error,
        deleteLoading,
        deleteError
    } = useSelector((state) => state?.users);
    
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [localPage, setLocalPage] = useState(1);
    const [searchTimeout, setSearchTimeout] = useState(null);

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

    // Debounced search handler
    const handleSearch = (e) => {
        const value = e?.target?.value;
        setSearchTerm(value);
        
        // Clear previous timeout
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Set new timeout
        setSearchTimeout(
            setTimeout(() => {
                if (value.trim() === '') {
                    dispatch(fetchUsers(1));
                }
            }, 500)
        );
    };

    // Filter users based on search term
    const filteredUsers = users?.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            `${user?.first_name} ${user?.last_name}`.toLowerCase().includes(searchLower) ||
            user?.email.toLowerCase().includes(searchLower)
        );
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                setDeletingId(id);
                await dispatch(deleteUser(id)).unwrap();
                // alert("User is deleted!!")
                // Refresh users after deletion
                if (users?.length === 1 && currentPage > 1) {
                    dispatch(setPage(currentPage - 1));
                } else {
                    dispatch(fetchUsers(currentPage));
                }
            } catch (error) {
                console.error('Delete failed:', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (status === 'loading') return <LoadingSpinner />;
    if (error) return (
        <div className="text-center xl:py-40 lg:py-28 md:py-56 py-36 font-medium md:text-base text-sm text-red-500">
            {error}
        </div>
    );

    return (
        <div className="bg-[#a21d3c20] mx-auto xl:px-10 lg:px-8 md:px-6 px-4 lg:py-8 md:py-5 py-4">
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="xl:text-2xl lg:text-xl text-lg font-bold text-[#A21D3C]">
                    Users List
                </h2>
                <div className="relative w-full lg:w-[32%] md:w-[60%]">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full bg-white px-4 pl-10 lg:py-2 py-[6px] border border-[#A21D3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A21D3C] focus:border-transparent"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A21D3C]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {deleteError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                    {deleteError}
                </div>
            )}

            {/* User Grid */}
            {filteredUsers?.length === 0 ? (
                <div className="text-center xl:py-40 lg:py-28 md:py-56 py-36 text-gray-500 font-medium">
                    {searchTerm ? 'No users match your search' : 'No users found'}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
                    {filteredUsers?.map((user) => (
                        <UserCard
                            key={user?.id}
                            user={user}
                            onEdit={() => navigate(`/users/edit/${user?.id}`)}
                            onDelete={() => handleDelete(user?.id)}
                            isDeleting={deletingId === user?.id}
                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center xl:mt-16 md:mt-14 mt-10">
                    <nav className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(localPage - 1)}
                            disabled={localPage === 1}
                            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                            aria-label="Previous page"
                        >
                            <FaArrowLeftLong className="text-[#A21D3C]" />
                            <span>Previous</span>
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNum = i + 1;
                            // Show first, last, and nearby pages
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= localPage - 1 && pageNum <= localPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-4 py-2 rounded-md border transition-colors ${
                                            localPage === pageNum
                                                ? 'bg-[#A21D3C] text-white border-[#A21D3C]'
                                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            }
                            // Show ellipsis
                            if (pageNum === 2 && localPage > 3) {
                                return <span key="left-ellipsis" className="px-2">...</span>;
                            }
                            if (pageNum === totalPages - 1 && localPage < totalPages - 2) {
                                return <span key="right-ellipsis" className="px-2">...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => handlePageChange(localPage + 1)}
                            disabled={localPage === totalPages}
                            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                            aria-label="Next page"
                        >
                            <span>Next</span>
                            <FaArrowRightLong className="text-[#A21D3C]" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default UserList;