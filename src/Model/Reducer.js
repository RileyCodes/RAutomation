const Reducer = (state, action) => {
    console.log('Reducer called:' + action.type)
    console.log('payload:')
    console.log(action.payload)
    console.log('state:')
    console.log(state)


    switch (action.type) {
        case 'setPoints':
            console.log('setPoints');
            return{
                ...state,
                points: action.payload
            };
        case 'setConnection':
            return {
                ...state,
                connection: action.payload
            };
        case 'setLine':
            return {
                ...state,
                lines: action.payload
            };
        case 'clearConnection':
            return {...state,connection:{}};
        case 'setDimensions':
            return {
                ...state,
                dimensions: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;