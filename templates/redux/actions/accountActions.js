module.exports=`import Axios from "../../api/axios";
import { FETCH_SUCCESS } from "../actionTypes/types";

export function fetchSuccess(account) {
  return { type: FETCH_SUCCESS, account };
}

export function fetchAccount() {
  return (dispatch) => {
    Axios.get("/accounts/me")
    .then(({ data }) => data.data)
    .then(account => dispatch(fetchSuccess(account)));
  };
}
`;