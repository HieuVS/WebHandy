const initialState = {
    items: []
};


const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'ADD_ITEM_ORDER': 
        return {
            ...state,
            items: [...state.items, payload]
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