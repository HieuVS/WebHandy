const initialState = {
    table: {}
};

const tableReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_TABLE' : 
            return {
                ...state,
                table: payload
            }    
        default :
            return state;
    }
}

export default tableReducer;
