import { backgroundColors } from "../constants/colors";
import types from "../redux/types";


const initialState = {
    loading: true,
    user: {},
    list: []
}

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD:
            return { ...state, list: action.list, user: action.user, loading: false };
        default:
            return state;
    }

};


export default todoReducer;