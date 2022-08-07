import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import orderReducer from './orderReducer';
import itemReducer from './itemReducer';
import paymentReducer from './paymentReducer';
import tableReducer from './tableReducer';
import infoReducer from './infoReducer';
import inputOrderReducer from './inputOrderReducer';
import discountReducer from './discountReducer';

const rootReducer = combineReducers({
    schedule: scheduleReducer,
    order: orderReducer,
    item: itemReducer,
    payment: paymentReducer,
    table: tableReducer,
    info: infoReducer,
    inputOrder: inputOrderReducer,
    discount: discountReducer
});

export default rootReducer;