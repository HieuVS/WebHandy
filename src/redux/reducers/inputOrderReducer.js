const initialState = {
    customer: {}
};


const inputOrderReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'ADD_INFO_ORDER': 
        return {
            ...state,
            customer: payload
        }
        default:
            return state;
    }
}

export default inputOrderReducer;