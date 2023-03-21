import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  employees: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setEmployees: (state, action) => {
      state.employees = action.payload.employees;
    },
    setEmployee: (state, action) => {
      const updatedEmployees = state.employees.map((employee) => {
        if (employee._id === action.payload.employee._id) return action.payload.employee;
        return employee;
      });
      state.employees = updatedEmployees;
    },
  },
});

export const { setLogin, setLogout, setEmployees, setEmployee } = authSlice.actions;
export default authSlice.reducer;