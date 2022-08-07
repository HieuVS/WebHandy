import axios from "axios";
import { apiURL } from "./api.constants";
import store from "../redux/store";

export const getDiscount = async () => {
    try {
        const response = await axios.get(`${apiURL}/discount`);
        if(response.data.success) {
            //console.log(response.data)
            store.dispatch({type: 'LOAD_DISCOUNT', payload: response.data.discountList})           
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error!'}
    }
}