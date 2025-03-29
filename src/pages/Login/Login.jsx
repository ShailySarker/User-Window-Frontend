import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../../redux/apis/authApi';

const Login = () => {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state?.auth);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const result = await dispatch(loginUser({ email, password }));
            console.log('Login successful:', result); // Debug log
            navigate('/users');
        } catch (err) {
            console.error('Login error:', err); // Debug log
            setError(typeof err === 'string' ? err : 'Login failed');
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="md:max-w-md md:w-full w-5/6 mx-auto mt-10 bg-white md:p-8 p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full shadow-md px-3 py-2 border border-[#A21D3C] focus:outline-none focus:ring-1 focus:ring-[#A21D3C] rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full shadow-md px-3 py-2 border border-[#A21D3C] focus:outline-none focus:ring-1 focus:ring-[#A21D3C] rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 text-lg font-semibold w-full bg-[#A21D3C] text-white py-2 px-4 rounded-md hover:bg-[#83152f] disabled:bg-[#a21d3c9d] disabled:text-black"
                        // disabled={, loading === 'loading'}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}

                        {/* {status === 'loading' ? <LoadingSpinner /> : 'Login'} */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;