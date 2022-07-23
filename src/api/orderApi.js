import axios from "axios";
import { apiURL } from "../api/api.constants";
//import store from "../redux/store";

export const postOrder = async (orderForm) => {
    console.log('orderForm', orderForm)
    try {
        const response = await axios.post(`${apiURL}/makeOrder`, orderForm);
        if(response.data.success) {
            console.log(response.data)
            return response.data
            //store.dispatch({type: 'LOAD_ITEM_LIST', payload: response.data.itemList})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}