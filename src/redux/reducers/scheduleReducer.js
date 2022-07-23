const initialState = {
    items: []
};

const scheduleReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_ITEM_SCHEDULE' : 
            //console.log('PAYLOAD:', payload)
            return {
                ...state,
                items: [...state.items, payload]
            }    
        case '' :

            return 0;
        default :
            return state;
    }
}

export default scheduleReducer;
