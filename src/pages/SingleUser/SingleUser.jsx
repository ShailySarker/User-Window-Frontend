import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateUser } from "../../redux/apis/userApi";
import { IoMdCloseCircle } from "react-icons/io";

const SingleUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: users, editLoading, editError } = useSelector((state) => state?.users);
    const user = users?.find((u) => u?.id === parseInt(id));

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData?.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData?.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData?.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const result = await dispatch(updateUser({ id, userData: formData }));
            // navigate('/users', { state: { successMessage: 'User updated successfully!' } });
            alert("User updated successfully!")
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">User not found</h2>
                    <button
                        onClick={() => navigate('/users')}
                        className="px-4 py-2 bg-[#A21D3C] text-white rounded hover:bg-[#8a1a35] transition-colors"
                    >
                        Back to Users
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
                <h2 className="flex justify-between text-2xl font-bold text-center text-[#A21D3C] mb-6">
                    Edit User
                    <IoMdCloseCircle onClick={() => navigate("/users")} />
                    </h2>

                {editError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                        {editError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700 mb-2 font-medium">
                            First Name
                        </label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={formData?.first_name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors?.first_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#A21D3C]'
                                }`}
                            required
                        />
                        {errors?.first_name && (
                            <p className="mt-1 text-sm text-red-600">{errors?.first_name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700 mb-2 font-medium">
                            Last Name
                        </label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={formData?.last_name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors?.last_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#A21D3C]'
                                }`}
                            required
                        />
                        {errors?.last_name && (
                            <p className="mt-1 text-sm text-red-600">{errors?.last_name}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors?.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#A21D3C]'
                                }`}
                            required
                        />
                        {errors?.email && (
                            <p className="mt-1 text-sm text-red-600">{errors?.email}</p>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate('/users')}
                            className="font-medium px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            disabled={editLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="font-medium px-6 py-2 bg-[#A21D3C] text-white rounded-lg hover:bg-[#8a1a35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A21D3C] focus:ring-opacity-50 flex items-center justify-center min-w-32"
                            disabled={editLoading}
                        >
                            {editLoading ? "Saving..." : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleUser;