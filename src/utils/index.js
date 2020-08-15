export const CARD_PAIRS_VALUE = 6;

export const populateList = (itemCount) => {
    const tempArray = [];
    for(let i=0;i<itemCount;i++) {
        tempArray.push({number: i + 1, isShowing: false});
        tempArray.push({number: i + 1, isShowing: false});
    }
    tempArray.sort(() => Math.random() - 0.5);
    return tempArray
}