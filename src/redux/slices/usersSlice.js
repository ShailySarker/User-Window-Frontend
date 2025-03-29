import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers, updateUser } from "../../apis/userApi";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
  const response = await getUsers(page);
  return response;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, userData }) => {
  const response = await updateUser(id, userData);
  return { id, userData: response };
});

export const removeUser = createAsyncThunk('users/removeUser', async (id) => {
  await deleteUser(id);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    page: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
    editStatus: 'idle',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        const index = state.data.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload.userData };
        }
      })
      .addCase(editUser.rejected, (state) => {
        state.editStatus = 'failed';
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload);
      });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;