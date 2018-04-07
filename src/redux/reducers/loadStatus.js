let initialState = {
    loadErrors: [],
    fulfilledCounts: {},
}

var lastId = 0;
const getId = () => lastId++;

export default (state = initialState, action) => {

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
        return state;
    }

    // provide a way to dismiss errors
    if (action.type === "DISMISS_ERROR") {
        const {fromQueue, id} = action;
        const eIndex = state[fromQueue].findIndex(e => e.id === id);
        state[fromQueue].splice(eIndex, 1);
        return state;
    }

    return state;
}
