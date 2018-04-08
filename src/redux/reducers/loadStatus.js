let initialState = {
    loadErrors: [],
    fulfilledCounts: {},
}

var lastId = 0;
const getId = () => lastId++;

export default (state = initialState, action) => {

    const removeErrorType = (type) => {
        const eType = type + '_REJECTED';
        state.loadErrors = state.loadErrors.filter(e => e.type != eType);
    }

    // if an error comes from any promise, just add it to our queue
    if (action.type.endsWith("_REJECTED")) {
        action.id = getId();
        state.loadErrors.push(action);
        return state;
    }

    // if an action is fulfilled, count it
    if (action.type.endsWith("_FULFILLED")) {
        state.fulfilledCounts[action.type] || (state.fulfilledCounts[action.type] = 0);
        state.fulfilledCounts[action.type]++;

        // also remove related errors since we have a success now
        const baseType = action.type.slice(0, -10);
        removeErrorType(baseType);

        return state;
    }

    // dismiss error by id
    if (action.type === "DISMISS_ERROR") {
        const {id} = action;
        const eIndex = state.loadErrors.findIndex(e => e.id === id);
        state.loadErrors.splice(eIndex, 1);
        return state;
    }

    // dismiss all errors
    if (action.type === "DISMISS_ERRORS") {
        state.loadErrors = [];
        return state;
    }

    // dismiss errors by type
    if (action.type === "DISMISS_ERROR_TYPE") {
        removeErrorType(action.errorType);
        return state;
    }

    return state;
}
