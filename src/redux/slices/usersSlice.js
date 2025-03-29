import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
    editLoading: false,
    editError: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.total_pages;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        editUserStart: (state) => {
            state.editLoading = true;
            state.editError = null;
        },
        editUserSuccess: (state, action) => {
            state.editLoading = false;
            const index = state.users.findIndex(u => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        editUserFailure: (state, action) => {
            state.editLoading = false;
            state.editError = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        }
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
    deleteUserSuccess
} = usersSlice.actions;
export default usersSlice.reducer;