const initialState = {
    customer: {}
};


const infoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'ADD_INFO': 
        return {
            ...state,
            customer: payload
        }
        default:
            return state;
    }
}

export default infoReducer;