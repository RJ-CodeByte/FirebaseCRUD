import FireConfig from "../config/FireConfig";
import types from "./types"




export const AddTodo = (lists, user) => {
    return dispatch => {
        console.log('name', lists)
        dispatch({
            type: types.ADD,
            list: lists,
            user: user
        });
    }
}



