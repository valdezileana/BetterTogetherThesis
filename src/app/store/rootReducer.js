import {combineReducers} from 'redux'
import eventReducer from '../../features/events/eventReducer'
import testReducer from '../../features/sandbox/testReducer'
import authReducer from '../../features/auth/authReducer'
import modalReducer from '../common/modals/modalReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer
})

export default rootReducer;