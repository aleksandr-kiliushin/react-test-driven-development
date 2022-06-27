import { ICustomer } from "#types/ICustomer"

import { AppThunk } from "./index"

export interface IState {
  customers: ICustomer[]
}

const initialState: IState = {
  customers: [],
}

export const customersSearchReducer = (
  state: IState = initialState,
  action: {
    payload: { customers: ICustomer[] }
    type: "customers-search/setCustomers"
  }
): IState => {
  switch (action.type) {
    case "customers-search/setCustomers": {
      return {
        ...state,
        customers: action.payload.customers,
      }
    }
    default:
      return state
  }
}

export const fetchAndSetCustomers = ({
  pageNumberSearchParam,
  searchTermSearchParam,
}: {
  pageNumberSearchParam: string
  searchTermSearchParam: string | null
}): AppThunk => {
  return (dispatch) => {
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
      .then((customers) =>
        dispatch({
          payload: { customers },
          type: "customers-search/setCustomers",
        })
      )
  }
}
