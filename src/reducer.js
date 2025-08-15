function reducer(state, action) {
    // console.log(action);
    switch (action.type) {
        case "addData":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.type]: action.payload.data,
                },
            };
        case "setSelected":
            return {
                ...state,
                selected: action.payload.selected,
                data: action.payload.data,
            };
        case "setWho":
            // console.log("Here: ", action);
            return {
                ...state,
                who: {
                    ...state.who,
                    [action.payload.type]: action.payload.data,
                },
            };
        case "setWhere":
            return { ...state, where: action.payload };
        case "finishedLoading":
            return { ...state, loaded: true };
        case "setEnrolled":
            return {
                ...state,
                enrolled: action.payload,
                special: !(action.payload && state.current),
            };
        case "setCurrent":
            return {
                ...state,
                current: action.payload,
                special: !(action.payload && state.enrolled),
            };
        default:
            // console.log("No handler for reducer");
            return state;
        // throw new Error();
    }
}
