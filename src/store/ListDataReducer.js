import {
    UPDATING_LIST_DATA, 
    INCREASING_COUNTER, 
    RECORD_POSITION, 
    REFRESH_LIST,
    UPDATE_PAIRS_DONE
} from '../../src/actions'

const initialState = {
    data: {}, counter: 0, previousPositionClicked: -1, updateListing: false, pairsCompleted: 0
};

const ListDataReducer  = ( state = initialState, action ) => {
    switch(action.type) {
        case UPDATING_LIST_DATA:
            return {...state, data: action.data};
        case INCREASING_COUNTER:
            return {...state, counter: action.data};
        case RECORD_POSITION:
            return {...state, previousPositionClicked: action.data};
        case REFRESH_LIST:
            return {...state, updateListing: action.data};
        case UPDATE_PAIRS_DONE:
            return {...state, pairsCompleted: action.data};
    }
    return {...state};
}
export default ListDataReducer;
