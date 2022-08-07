const initialState = {
    discounts: []
}

const discountReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_DISCOUNT': 
        return {
            ...state,
            discounts: payload
        }
        default:
        return state;
    }
}

export default discountReducer;