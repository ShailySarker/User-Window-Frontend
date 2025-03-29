import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/slices/authSlice';
import { FaUsers } from 'react-icons/fa';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="xl:px-10 lg:px-8 md:px-6 px-4 xl:py-5 py-4 flex justify-between items-center">
                <h1 className="xl:text-2xl/none lg:text-xl/none text-lg/normal font-bold flex items-center gap-2 text-[#A21D3C]"><FaUsers className='lg:text-2xl md:text-xl text-lg'/>User Window</h1>
                <button
                    onClick={handleLogout}
                    className="xl:text-lg md:text-base/none text-sm/none xl:px-7 px-5 xl:py-2 lg:py-[6px] py-2 font-medium text-white rounded-lg bg-[#A21D3C]"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;