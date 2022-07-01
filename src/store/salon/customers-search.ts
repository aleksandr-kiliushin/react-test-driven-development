import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ICustomer } from "#types/salon/ICustomer"

export interface IState {
  customers: ICustomer[]
}

const initialState: IState = {
  customers: [],
}

export const customersSearchSlice = createSlice({
  initialState,
  name: "customers-search",
  reducers: {
    setCustomers(state, action: PayloadAction<ICustomer[]>) {
      state.customers = action.payload
    },
  },
})

export const fetchAndSetCustomers = createAsyncThunk(
  "todays-appointments/fetchAndSetCustomers",
  (
    {
      pageNumberSearchParam,
      searchTermSearchParam,
    }: {
      pageNumberSearchParam: string
      searchTermSearchParam: string | null
    },
    thunkApi
  ) => {
    globalThis
      .fetch(
        `/api/customers?page=${pageNumberSearchParam}${
          searchTermSearchParam ? `&searchTerm=${searchTermSearchParam}` : ""
        }`,
        {
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      )
      .then((response) => response.json())
      .then((customers) => thunkApi.dispatch(customersSearchSlice.actions.setCustomers(customers)))
  }
)

export const { setCustomers } = customersSearchSlice.actions
