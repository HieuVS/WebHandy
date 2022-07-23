const initialState = {
    order: []
};


const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'LOAD_ORDER_LIST': 
        return {

        }
        case 'POST_ORDER': 
        return {

        }
        case 'DELETE_ORDER': 
        return {

        }
        case 'UPDATE_ORDER':
            return {

            };
        default:
            return state;
    }
}

export default orderReducer;