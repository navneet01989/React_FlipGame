import {
    UPDATING_LIST_DATA, 
    UPDATE_COUNTER, 
    RECORD_POSITION, 
    UPDATE_PAIRS_DONE,
    POSITION_BACKUP,
    SELECTION,
    PAIRS
} from '../../src/actions'

const initialState = {
    data: {}, counter: 0, previousPositionClicked: -1, positionBackup: -1, pairsCompleted: 0, selection: [], pairs: []
};

const ListDataReducer  = ( state = initialState, action ) => {
    switch(action.type) {
        case UPDATING_LIST_DATA:
            return {...state, data: action.data};
        case UPDATE_COUNTER:
            return {...state, counter: action.data};
        case RECORD_POSITION:
            return {...state, previousPositionClicked: action.data};
        case UPDATE_PAIRS_DONE:
            return {...state, pairsCompleted: action.data};
    }
    return {...state};
}
export default ListDataReducer;
