export const UPDATING_LIST_DATA = 'UPDATING_LIST_DATA';
export const UPDATE_COUNTER = 'UPDATE_COUNTER';
export const RECORD_POSITION = 'RECORD_POSITION';
export const UPDATE_PAIRS_DONE = 'UPDATE_PAIRS_DONE';

export const updatePairs = data => ({
    type: UPDATE_PAIRS_DONE,
    data: data
});

export const setListData = data => ({
    type: UPDATING_LIST_DATA,
    data: data
});

export const updateCounter = data => ({
    type: UPDATE_COUNTER,
    data: data
});

export const recordPosition = data => ({
    type: RECORD_POSITION,
    data: data
});

