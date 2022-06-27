import { ICustomer } from "#types/ICustomer"

export interface IState {
  customers: ICustomer[]
}

const initialState: IState = {
  customers: [],
}

export const customersSearchReducer = (
  state: IState = initialState,
  action: {
    payload: any
    type: "customers-search/setCustomers"
  }
) => {
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
