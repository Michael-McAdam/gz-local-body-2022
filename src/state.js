import createStore from "unistore";

const initialState = {
    data: {
        region: [],
        district: [],
        ward: [],
        board: [],
        subdivision: [],
    },
    region: [],
    selected: [],
    who: {
        district: [],
        region: [],
        mayor: [],
        board: [],
    },
    where: [],
    loaded: false,
    special: false,
    enrolled: true,
    current: true,
};

const store = createStore(initialState);

export default store;
