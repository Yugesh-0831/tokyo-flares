import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchCount } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (item) => {
    const response = await createOrder(item);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

export const { increment } = counterSlice.actions;

// export const selectOrders = (state) => state.order.orders;

export default counterSlice.reducer;
