module.exports=`import { FETCH_SUCCESS } from "../actionTypes/types.js";

const initialState = {
  account: {},
};

export default function load(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { account: action.account };
    default:
      return state;
  }
}
`