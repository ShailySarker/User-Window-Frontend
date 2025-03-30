// import React from 'react';

// const UserCard = ({ user, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="p-4">
//         <div className="flex items-center mb-4">
//           <img
//             src={user?.avatar}
//             alt={`${user?.first_name} ${user?.last_name}`}
//             className="w-16 h-16 rounded-full mr-4"
//           />
//           <div>
//             <h3 className="font-bold text-lg">
//               {user?.first_name} {user?.last_name}
//             </h3>
//             <p className="text-gray-600">{user?.email}</p>
//           </div>
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onEdit}
//             className="font-medium px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Edit
//           </button>
//           <button
//             onClick={onDelete}
//             className="font-medium px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import React from 'react';

const UserCard = ({ user, onEdit, onDelete, isDeleting = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={user?.avatar}
            alt={`${user?.first_name} ${user?.last_name}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#A21D3C]"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150'; // Fallback avatar
            }}
          />
          <div className="ml-4">
            <h3 className="font-bold text-lg text-gray-800 truncate">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-gray-600 text-sm truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 md:text-base/none text-sm/none font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A21D3C] focus:ring-opacity-50"
            aria-label={`Edit ${user?.first_name} ${user?.last_name}`}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className={`px-4 py-2 md:text-base/none text-sm/none font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isDeleting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed focus:ring-gray-400'
                : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
            }`}
            aria-label={`Delete ${user?.first_name} ${user?.last_name}`}
          >
            {isDeleting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;