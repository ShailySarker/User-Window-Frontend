// import { createSlice } from '@reduxjs/toolkit';

import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     users: [],
//     currentPage: 1,
//     totalPages: 1,
//     loading: false,
//     error: null,
//     editLoading: false,
//     editError: null
// };

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         fetchUsersStart: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         fetchUsersSuccess: (state, action) => {
//             state.loading = false;
//             state.users = action.payload.data;
//             state.currentPage = action.payload.page;
//             state.totalPages = action.payload.total_pages;
//         },
//         fetchUsersFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         setPage: (state, action) => {
//             state.currentPage = action.payload;
//         },
//         editUserStart: (state) => {
//             state.editLoading = true;
//             state.editError = null;
//         },
//         editUserSuccess: (state, action) => {
//             state.editLoading = false;
//             const index = state.users.findIndex(u => u.id === action.payload.id);
//             if (index !== -1) {
//                 state.users[index] = action.payload;
//             }
//         },
//         editUserFailure: (state, action) => {
//             state.editLoading = false;
//             state.editError = action.payload;
//         },
//         deleteUserSuccess: (state, action) => {
//             state.users = state.users.filter(u => u.id !== action.payload);
//         }
//     }
// });

// // Export actions
// export const {
//     fetchUsersStart,
//     fetchUsersSuccess,
//     fetchUsersFailure,
//     setPage,
//     editUserStart,
//     editUserSuccess,
//     editUserFailure,
//     deleteUserSuccess
// } = usersSlice.actions;
// export default usersSlice.reducer;

const initialState = {
    data: [],          // Array of user objects (renamed from 'users' to match API response)
    page: 1,           // Current page number (renamed from 'currentPage')
    per_page: 6,       // Items per page
    total: 0,          // Total number of users
    total_pages: 1,    // Total pages available
    loading: false,
    error: null,
    editLoading: false,
    editError: null,
    deleteLoading: false,  // Added separate loading state for delete
    deleteError: null      // Added separate error state for delete
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Fetching users
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.page = action.payload.page;
            state.per_page = action.payload.per_page;
            state.total = action.payload.total;
            state.total_pages = action.payload.total_pages;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Pagination
        setPage: (state, action) => {
            state.page = action.payload;
        },

        // Editing users
        editUserStart: (state) => {
            state.editLoading = true;
            state.editError = null;
        },
        editUserSuccess: (state, action) => {
            state.editLoading = false;
            const index = state.data.findIndex(u => u.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        },
        editUserFailure: (state, action) => {
            state.editLoading = false;
            state.editError = action.payload;
        },

        // Deleting users
        deleteUserStart: (state) => {
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteUserSuccess: (state, action) => {
            state.deleteLoading = false;
            state.data = state.data.filter(u => u.id !== action.payload);
            state.total = Math.max(0, state.total - 1); // Decrement total count
            // Recalculate total pages
            state.total_pages = Math.ceil(state.total / state.per_page);
        },
        deleteUserFailure: (state, action) => {
            state.deleteLoading = false;
            state.deleteError = action.payload;
        },

        // Reset state
        resetUsersState: () => initialState
    }
});

// Export actions
export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    setPage,
    editUserStart,
    editUserSuccess,
    editUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    resetUsersState
} = usersSlice.actions;

export default usersSlice.reducer;