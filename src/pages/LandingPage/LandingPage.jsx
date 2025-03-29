import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="flex items-center justify-center gap-3 text-[#A21D3C] animate-bounce">
                <FaUsers className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl" />
                <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold">User Window</h1>
            </div>
        </div>
    );
};

export default LandingPage;