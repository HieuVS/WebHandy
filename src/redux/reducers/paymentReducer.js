const initialState = {
    totalAmount: ''
};

const paymentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_PAYMENT' : 
            return {
                ...state,
                totalAmount: payload
            }    
        default :
            return state;
    }
}

export default paymentReducer;
